import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WikidataService } from 'src/app/services/wikidata.service';
import { ToastService } from 'src/app/services/toast.service';
import { Videojuego, WikiResp, WikiPair } from 'src/app/model/model';

@Component({
  selector: 'app-entities-page',
  templateUrl: './videogamesSection.component.html',
  styleUrls: ['./videogamesSection.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class VideogamesSectionComponent implements OnInit {
  entities: string[] = [
    'Q94657658' ,
    'Q94648063' ,
    'Q94653248'
  ];
  queries: string[];
  results: Videojuego[];
  loaded: boolean;

  constructor(private wikidataService: WikidataService, private toastService: ToastService) { }

  ngOnInit() {
    this.queries = [];
    for (const entity of this.entities) {
      // tslint:disable-next-line: max-line-length
      const query = `PREFIX%20entity%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%0A%0ASELECT%20%3FpropUrl%20%3FpropLabel%20%3FvalUrl%20%3FvalLabel%20%3Fpicture%0AWHERE%0A%7B%0A%09hint%3AQuery%20hint%3Aoptimizer%20%27None%27%20.%0A%09%7B%09BIND(entity%3A${entity}%20AS%20%3FvalUrl)%20.%0A%09%09BIND(%22N%2FA%22%20AS%20%3FpropUrl%20)%20.%0A%09%09BIND(%22identity%22%40en%20AS%20%3FpropLabel%20)%20.%0A%09%7D%0A%09UNION%0A%09%7B%09entity%3A${entity}%20%3FpropUrl%20%3FvalUrl%20.%0A%09%09%3Fproperty%20%3Fref%20%3FpropUrl%20.%0A%09%09%3Fproperty%20rdf%3Atype%20wikibase%3AProperty%20.%0A%09%09%3Fproperty%20rdfs%3Alabel%20%3FpropLabel%0A%09%7D%0A%09%0A%20%20%09%3FvalUrl%20rdfs%3Alabel%20%3FvalLabel%0A%09FILTER%20(LANG(%3FvalLabel)%20%3D%20%27en%27)%20.%0A%09OPTIONAL%7B%20%3FvalUrl%20wdt%3AP18%20%3Fpicture%20.%7D%0A%09FILTER%20(lang(%3FpropLabel)%20%3D%20%27en%27%20)%0A%7D%0AORDER%20BY%20%3FpropUrl%20%3FvalUrl`;
      this.queries.push(query);
    }

    this.results = [];
    this.loaded = false;
    for (const quer of this.queries) {
      this.wikidataService.getQuery(quer).subscribe(
        (res: WikiResp) => {
          this.results.push(this.parsePro(res.results.bindings));
          if (this.results.length === this.queries.length) {
            this.loaded = true;
          }
        }
      );
    }
  }

  parsePro(res: any): Videojuego {
    const game = new Videojuego();

    console.log(res);
    let aux = res.filter(vgame => vgame.propLabel.value === 'identity');
    game.identity = new WikiPair(aux[0].valUrl.value, aux[0].valLabel.value);

    aux = res.filter(vgame => vgame.propLabel.value === 'platform');
    game.platform = aux.map(plat => new WikiPair(plat.valUrl.value, plat.valLabel.value));

    aux = res.filter(vgame => vgame.propLabel.value === 'genre');
    game.genre = aux.map(genre => new WikiPair(genre.valUrl.value, genre.valLabel.value));

    aux = res.filter(vgame => vgame.propLabel.value === 'publisher');
    game.publisher = aux.map(publisher => new WikiPair(publisher.valUrl.value, publisher.valLabel.value));

    aux = res.filter(vgame => vgame.propLabel.value === 'developer');
    game.developer = aux.map(dev => new WikiPair(dev.valUrl.value, dev.valLabel.value));

    aux = res.filter(vgame => vgame.propLabel.value === 'game mode');
    game.gamemode = aux.map(gm => new WikiPair(gm.valUrl.value, gm.valLabel.value));

    aux = res.filter(vgame => vgame.propLabel.value === 'distributed by');
    game.distributedby = aux.map(db => new WikiPair(db.valUrl.value, db.valLabel.value));

    return game;
  }

}
