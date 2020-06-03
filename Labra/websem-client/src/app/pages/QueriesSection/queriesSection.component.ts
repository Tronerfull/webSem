import { Component, OnInit } from '@angular/core';
import { WikiQuery, WikiResp } from 'src/app/model/model';
import { WikidataService } from 'src/app/services/wikidata.service';
import { ToastService } from 'src/app/services/toast.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-queries-page',
  templateUrl: './queriesSection.component.html',
  styleUrls: ['./queriesSection-.component.scss']
})
export class QueriesSectionComponent implements OnInit {
  queryCol: { field: string, header: string }[];
  queries: WikiQuery[] = [{ name: 'Juegos desarrollados por ACE TEAM', value: `SELECT%20%3Fgame%20%3Flabel%20%3FlaunchDate%20%3Fdeveloper%20WHERE%20%7B%0A%3Fgame%20wdt%3AP31%20wd%3AQ7889%20%3B%0Ardfs%3Alabel%20%3Flabel%20%3B%0Awdt%3AP577%20%3FlaunchDate%20%3B%0Awdt%3AP178%20%3Fdeveloper%20.%0A%20%20FILTER%28%28%3Fdeveloper%20%3D%20wd%3AQ2080159%29%20%26%26%20%28LANGMATCHES%28LANG%28%3Flabel%29%2C%20"en"%29%29%29%20.%0A%0ASERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"%5BAUTO_LANGUAGE%5D%2Cen".%20%7D%0A%20%20%7D%0A%0A%0A` },
                          { name: 'Juegos en ordenador en 2020', value: `SELECT%20distinct%20%3Fgame%20%3Flabel%20%3FlaunchDate%20%20WHERE%20%7B%0A%3Fgame%20wdt%3AP31%20wd%3AQ7889%20%3B%0Ardfs%3Alabel%20%3Flabel%20%3B%0Awdt%3AP577%20%3FlaunchDate%20%3B%0Awdt%3AP178%20%3Fdeveloper%20%3B%0Awdt%3AP400%20%3Fplataform%20%3B%0AFILTER%28%28YEAR%28%3FlaunchDate%29%20%3D%202020%29%20%20%26%26%20%28%3Fplataform%20%3D%20wd%3AQ68%29%20%26%26%20%28LANGMATCHES%28LANG%28%3Flabel%29%2C%20"en"%29%29%29%20%0A%20%20%20%20%20%20%0ASERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"%5BAUTO_LANGUAGE%5D%2Cen".%20%7D%0A%20%20%7D%0A%0A%0A%0A%0A` },
                          { name: 'Accion singelplayer entre 2010-2015', value: `SELECT%20distinct%20%3Fgame%20%3Flabel%20%3FlaunchDate%20%20WHERE%20%7B%0A%3Fgame%20wdt%3AP31%20wd%3AQ7889%20%3B%0Ardfs%3Alabel%20%3Flabel%20%3B%0Awdt%3AP577%20%3FlaunchDate%20%3B%0Awdt%3AP178%20%3Fdeveloper%20%3B%0Awdt%3AP136%20%3Fgenre%3B%0Awdt%3AP404%20%3Fgamemode%20%3B%0A%20%20FILTER%28%28%3Fgamemode%20%3D%20wd%3AQ208850%29%20%26%26%20%28%3Fgenre%3D%20wd%3AQ270948%29%20%26%26%28YEAR%28%3FlaunchDate%29%20>%3D2010%29%20%26%26%28YEAR%28%3FlaunchDate%29%20<%3D2015%29%20%20%26%26%20%28LANGMATCHES%28LANG%28%3Flabel%29%2C%20"es"%29%29%29%20.%0A%0ASERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20"%5BAUTO_LANGUAGE%5D%2Cen".%20%7D%0A%20%20%7D%0A%0A%0A%0A` }
                          ];
  selectedQuery: WikiQuery;
  queryResult: any;
  resCols: any[];
  loading: boolean;
  tableData: any[];

  constructor(private readonly wikidataService: WikidataService,
              private readonly toastService: ToastService,
              private readonly colorService: ColorService) {}

  ngOnInit() {
    this.queryCol = [
      { field: 'name', header: 'Queries de wikidata' }
    ];
  }

  onQuerySelect(event) {
    this.queryResult = null;
    this.loading = true;

    this.wikidataService.getQuery(this.selectedQuery.value).subscribe(
      (res: WikiResp) => {
        this.queryResult = res.results.bindings.map(resultPair => {
          resultPair.type = new Map();
          for (const key of Object.keys(resultPair)) {
            if (key !== 'type') {
              resultPair.type.set(key, resultPair[key].type);
              resultPair[key] = resultPair[key].value;
            }
          }
          return resultPair;
        });
        this.tableData = [...this.queryResult];
        this.resCols = [];
        for (const col of res.head.vars) {
          this.resCols.push({ field: col, header: col.toUpperCase() });
        }

        this.loading = false;
      },
      error => {
        this.toastService.sendToast('error', `ERROR ${error.status}`,
        'Error al ejecutar la query, que raro normalmente funciona...');
      }
    );
  }

  onQueryUnselect(event) {
    this.selectedQuery = null;
    this.queryResult = null;
  }



  onFilter(event, field) {
    this.tableData = [...this.queryResult.filter(
      t => t[field].toUpperCase().includes(event.target.value.toUpperCase()))];
  }

}
