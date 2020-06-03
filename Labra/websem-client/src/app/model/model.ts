export interface WikiQuery {
    name: string;
    value: string;
}

export interface WikiResp {
    results: { bindings: any[] };
    head: { vars: string[] };
}

export class Videojuego {
    genre: WikiPair[];
    publisher: WikiPair[];
    distributedby: WikiPair[];
    developer: WikiPair[];
    platform: WikiPair[];
    gamemode: WikiPair[];
    identity: WikiPair;

    toJSONLD(): string {
        let jsonld = `{
        "@context": "http://schema.org/",
        "@type": "videogame",`;
        jsonld += `"name": "${this.identity.value}",`;
        jsonld += `"sameAs": "${this.identity.url}",`;
        jsonld += `"platforms": [`;
        this.platform.forEach(plat => {
          jsonld += `{"@type": "Platform",
              "name": "${plat.value}",
              "sameAs": "${plat.url}"}`;
          if ( this.platform[this.platform.length - 1].value !== plat.value ) {
            jsonld += ',' ;
          }
        });

        jsonld += `], "Distributors": [`;
        this.distributedby.forEach(d => {
          jsonld += `{"@type": "DistributedBy",
              "name": "${d.value}",
              "sameAs": "${d.url}"}`;
          if ( this.distributedby[this.distributedby.length - 1].value !== d.value ) {
            jsonld += ',' ;
          }
        });
        jsonld += `], "Genres": [`;
        this.genre.forEach(g => {
          jsonld += `{"@type": "Genre",
                "name": "${g.value}",
                "sameAs": "${g.url}"}`;
          if ( this.genre[this.genre.length - 1].value !== g.value ) {
            jsonld += ',' ;
          }
        });
        jsonld += `], "GameModes": [`;
        this.gamemode.forEach(gm => {
          jsonld += `{"@type": "GameMode",
                "name": "${gm.value}",
                "sameAs": "${gm.url}"}`;
          if ( this.gamemode[this.gamemode.length - 1].value !== gm.value ) {
            jsonld += ',' ;
          }
        });
        jsonld += `], "Developers": [`;
        this.developer.forEach(dev => {
          jsonld += `{"@type": "Developer",
                  "name": "${dev.value}",
                  "sameAs": "${dev.url}"}`;
          if ( this.developer[this.developer.length - 1].value !== dev.value ) {
            jsonld += ',' ;
          }
        });
        jsonld += `], "Publishers": [`;
        this.publisher.forEach(pb => {
          jsonld += `{"@type": "Publisher",
                    "name": "${pb.value}",
                    "sameAs": "${pb.url}"}`;
          if ( this.publisher[this.publisher.length - 1].value !== pb.value ) {
            jsonld += ',' ;
          }

        });
        jsonld += ']}';

        jsonld = jsonld.replace(',]', ']').replace('},]', '}]').replace('",]', '"]');

        console.log(jsonld);
        return JSON.parse(jsonld);
    }
}

export class WikiPair {
    url: string;
    value: string;

    constructor(url: string, value: string) {
        this.url = url;
        this.value = value;
    }
}
