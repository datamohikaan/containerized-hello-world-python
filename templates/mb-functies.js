var toetsing_param;
var title;
var userid = "";

$(document).ready(function () {
  $(function () {
    $.ajax({
      url: "mb-json-sso.json",
      dataType: "json",
      async: false,
      success: function (data) {
        userid = data.userid;
        if (data.usernaam  !== undefined && data.usernaam != '') {
          userid = data.usernaam;
        }
        usergroep = data.usergroep;
      },
    });

    if (userid != "") {
      $.ajax({
        url: "mb-json-groep.json",
        dataType: "json",
        async: false,
        success: function (data) {
          $.each(data, function (groep, gegevens) {
            if (groep == usergroep) {
              let titeltekst = 'title="' + gegevens.beschrijving + '"';
              let regel =
                '<a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown"ria-haspopup="true" aria-expanded="false" ' +
                titeltekst +
                ">" +
                userid +
                " (" +
                gegevens.usergroepnaam +
                ")" +
                "</a>";
              $(regel).appendTo("#mb-usermenu");
              let items = [];
              $.each(gegevens.usermenu, function (key, val) {
                $(regel).appendTo("mb-usermenuitem");
                items.push(
                  '<a class="dropdown-item" rel="menu-link" nav-url="' +
                    key +
                    '">' +
                    val +
                    "</a>"
                );
              });
              $("<div/>", {
                class: "dropdown-menu",
                html: items.join(""),
              }).appendTo("#mb-usermenu");
              $("#mb-usermenu").addClass("mb-xxuserid");
            }
          });
        },
      });
    }

    $("a[rel=menu-link]").click(function (e) {
      e.preventDefault();
      $("#melding").html("");
      $(".dropdown-menu").removeClass("show");
      let pageValue = $(this).attr("nav-url");
      const queryParameters = {
        page: pageValue,
      };
      page_open(queryParameters);
      return false;
    });

    rdflib.enableLinkCallback(true);
    $("#main-block-inhoud").html(welkom);

    if (window.location.search != "") {
      let queryString = new URLSearchParams(window.location.search);
      let pageValue = queryString.get("page");
      let graphuri = queryString.get("graph");
      let subjecturi = queryString.get("uri");

      const queryParameters = {
        page: pageValue,
        graphuri: graphuri,
        subjecturi: subjecturi,
        /* Toekomstige parameters */
        term: "TERM",
        kg: "CODE",
        vnr: "1.0.0",
        vdate: "2022-12-08",
        rdate: "2023-06-15",
        uri: "UUID",
      };
      page_open(queryParameters);
    }

    $("[rel=home-link]").click(function () {
      window.location.reload(true);
      return false;
    });

    $("[rel=zoeken]").click(function () {
      search();
      return false;
    });

    $("#search-input").keypress(function (e) {
      var key = e.which;
      if (key == 13) {
        // the enter key code
        $("[rel=zoeken]").click();
        return false;
      }
    });

    $("#melding").click(function (e) {
      e.preventDefault();
      alert(title);
      return false;
    });
  });
});

function link_callback() {
  let pageValue = event.currentTarget.dataset.link;
  let graphuri = event.currentTarget.dataset.graphuri;
  let subjecturi = event.currentTarget.dataset.subjecturi;
  const queryParameters = {
    page: pageValue,
    graphuri: graphuri,
    subjecturi: subjecturi,
  };
  page_open(queryParameters);
  return false;
}

function page_open(queryParameters) {
  let pageValue = queryParameters.page;
  $("#melding").html("");
  if (typeof window[pageValue] === "function") {
    window[pageValue](queryParameters);
  } else {
    let melding =
      pageValue +
      " is in deze versie van de modellenbibliotheek nog niet geïmplementeerd.";
    title =
      "page: " +
      queryParameters.pageValue +
      "\r\ngraphuri: " +
      queryParameters.graphuri +
      "\r\nsubjecturi: " +
      queryParameters.subjecturi;
    console.log("Melding: " + melding);
    $("#melding").html(melding);
    $("#melding").prop("title", title);
  }
  return false;
}

function maak_history(queryParameters) {
  console.log(queryParameters);
  $("[rel=brc-link]").click(function (e) {
    e.preventDefault();
    $("#melding").html("");
    let url = $(this).attr("menu-url");
    const queryParameters = {
      page: url.split(".")[0],
    };
    page_open(queryParameters);
    return false;
  });
}

function toetsing_return() {
  page_open(toetsing_param);
  return false;
}

function setBreadcrumb(breadcrumbs) {
  $("#breadcrumb").html(
    '<a rel="home-link" href="">' + breadcrumb_title + "</a>" + breadcrumbs
  );
}

function affilatie(queryParameters) {
  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="kennisgebiedenregister.html">Kennisgebiedenregister</a> / affilatie'
  );
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");
  rdflib.fetchData(
    document.getElementById("table1"),
    "\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  PREFIX kgr: <http://modellenbibliotheek.belastingdienst.nl/def/kgr#>\
  SELECT ?datum ?wijziging ?wijziging_label WHERE {\
     GRAPH <urn:name:kennisgebiedenregister> {\
      ?wijziging a kgr:Wijziging.\
      ?wijziging rdfs:label ?wijziging_label.\
      ?wijziging kgr:datumWijziging ?datum.\
    }\
  }\
  order by ?datum",
    {}
  );
  maak_history(queryParameters);
  return false;
}

function dashboard(queryParameters) {
  setBreadcrumb(" / Dashboard");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html(
    '<p>Onderstaande tabel geeft een overzicht van het aantal begrippen per kennismodel. Alleen het meest recente kennismodel wordt getoond.</p>\
  <p>Er is ook een <a rel="brc-link" menu-url="dashboard2.html">dashboard per kennisgebied</a> beschikbaar.</p>'
  );
  rdflib.fetchData(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
prefix mb:      <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
select ?model ?versiedatum (count(*) as ?aantal)\
where {\
  graph ?g {\
    ?m a mb:Model.\
    ?m rdfs:label ?model.\
    ?mv a mb:Modelversie.\
    ?mv mb:versiedatum ?versiedatum.\
    ?mv mb:status mb:Gepubliceerd.\
    ?s a skos:Concept\
  }\
  graph ?mg {\
    select ?m (max(?vd) as ?versiedatum)\
    where {\
      ?mv mb:versieVan ?m.\
      ?mv mb:versiedatum ?vd\
    }\
    group by ?m\
  }\
}\
group by ?model ?versiedatum \
order by desc(?aantal)",
    {}
  );
  maak_history(queryParameters);
  return false;
}

function dashboard2(queryParameters) {
  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="dashboard.html">Dashboard</a> / Dashboard per kennisgebied'
  );
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");
  rdflib.fetchData(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
PREFIX mb:      <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
PREFIX kgr: <http://modellenbibliotheek.belastingdienst.nl/def/kgr#>\
SELECT ?domein ?kennisgebied (count(distinct ?m) as ?aangeboden) (count(distinct ?mp) as ?gepubliceerd)\
WHERE {\
  GRAPH <urn:name:kennisgebiedenregister> {\
    ?kg a kgr:Kennisgebied.\
    ?kg rdfs:label ?kennisgebied.\
    OPTIONAL {?kg kgr:domein/rdfs:label ?domein}\
  }\
  OPTIONAL {\
    GRAPH ?mgraph {\
      ?m kgr:kennisgebied ?kg.\
      ?mv mb:versieVan ?m.\
    }\
  }\
  OPTIONAL {\
    GRAPH ?mpgraph {\
      ?mp kgr:kennisgebied ?kg.\
      ?mpv mb:versieVan ?mp.\
      ?mpv mb:status mb:Gepubliceerd.\
    }\
  }\
}\
GROUP BY ?domein ?kennisgebied \
ORDER BY desc(?aangeboden)",
    {}
  );
  maak_history(queryParameters);
  return false;
}

function ToDo_find(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / Dashboard");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function kennisbanken(queryParameters) {
  setBreadcrumb(" / Kennisbanken");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");
  rdflib.fetchData(
    document.getElementById("table1"),
    "\
  PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
  PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  SELECT ?_graph ?type (?_graph as ?model) ?model_label (?type as ?model_link) ?kwaliteitslabel ?versie ?datum \
  WHERE {\
    GRAPH ?_graph {\
      ?m a mb:Model.\
      ?m a ?maintype.\
      ?m rdfs:label ?model_label.\
      ?mv mb:versieVan ?m.\
      ?mv mb:versiedatum ?datum.\
      ?mv mb:versienummer ?versie.\
      ?mv mb:status mb:Gepubliceerd\
    } GRAPH <urn:name:types> {\
      ?maintype rdfs:label ?type.\
    }\
    OPTIONAL {\
      GRAPH ?toetsgraph {\
        ?toetsing a tlb:Toetsing.\
        ?toetsing tlb:betreft ?_graph.\
        ?toetsing tlb:kwaliteitslabel ?kwl.\
      }\
      GRAPH <urn:name:types> {\
        ?kwl rdfs:label ?kwaliteitslabel\
      }\
    }\
  }\
  order by ?model_label DESC(?datum) LIMIT 100"
  );
  maak_history(queryParameters);
  return false;
}

function kennisgebiedenregister(queryParameters) {
  setBreadcrumb(" / kennisgebiedenregister");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-inhoud").append(
    '<p>De geschiedenis van het kennisgebiedenregister kan hier bekeken worden: <a href="" onclick="affilatie();return false;">affiliatie</a>.</p>'
  );
  rdflib.fetchData(
    document.getElementById("table1"),
    '\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX kgr: <http://modellenbibliotheek.belastingdienst.nl/def/kgr#>\
SELECT ?code ?kennisgebied ?kennisgebied_label ?domein (strafter(str(?statusuri),"#") as ?status) WHERE {\
   GRAPH <urn:name:kennisgebiedenregister> {\
    ?kennisgebied a kgr:Kennisgebied.\
    ?kennisgebied rdfs:label ?kennisgebied_label.\
    ?kennisgebied kgr:code ?code.\
    ?kennisgebied kgr:status ?statusuri.\
    OPTIONAL {?kennisgebied kgr:domein/rdfs:label ?domein}\
  }\
}\
order by ?kennisgebied_label',
    {}
  );
  maak_history(queryParameters);
  return false;
}

function magazijn(queryParameters) {
  setBreadcrumb(" / magazijn");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");
  rdflib.fetchData(
    document.getElementById("table1"),
    '\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
SELECT ?status ?_graph ?type (if(bound(?m),?_graph,?m) as ?model) ?model_label (?type as ?model_link) (?_graph as ?triples) (concat(str(?aantal)," triples") as ?triples_label) ?versie ?versiedatum (str(?_graph) as ?graph) \
WHERE {\
  {\
    select ?_graph (count(*) as ?aantal)\
    where { graph ?_graph {?s?p?o} }\
    group by ?_graph\
  }\
  OPTIONAL {\
    GRAPH ?_graph {\
      ?m a mb:Model.\
      ?m a ?maintype.\
      ?m rdfs:label ?model_label.\
      ?mv mb:versieVan ?m.\
      ?mv mb:versiedatum ?versiedatum.\
      ?mv mb:versienummer ?versie.\
      ?mv mb:status ?mvstatus\
    } GRAPH <urn:name:types> {\
      ?maintype rdfs:label ?type.\
      ?mvstatus rdfs:label ?status.\
    }\
  }\
}\
order by DESC(?versiedatum) LIMIT 100'
  );
  maak_history(queryParameters);
  return false;
}

function toetsingslogboek(queryParameters) {
  setBreadcrumb(" / Toetsingslogboek");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html(
    '<p>Onderstaande tabel geeft alle openstaande verzoeken aan de Modelautoriteit weer. Door op de link te klikken, is meer informatie te vinden via het ticket van de servicedesk.</p>\
  <p>Verzoeken met de status "Ingediend" zijn nog niet opgepakt door de Modelautoriteit. Verzoeken met de status "Onderhanden" zijn daadwerkelijk in behandeling bij de Modelautoriteit. Voor de overige verzoeken geldt dat de Modelautoriteit wacht op een reactie van de indiener.</p>'
  );
  rdflib.fetchData(
    document.getElementById("table1"),
    "\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
SELECT ?type ?verzoek ?verzoek_label ?verzoek_glink ?datum ?status ?omschrijving \
WHERE {\
  GRAPH <urn:name:toetsingslogboek> {\
    ?verzoek a tlb:Verzoek.\
    ?verzoek mb:code ?verzoek_label.\
    ?verzoek rdfs:label ?omschrijving.\
    ?verzoek tlb:status ?vstatus.\
    ?verzoek tlb:jiraLink ?verzoek_glink.\
    ?verzoek tlb:datumVerzoek ?datum.\
    OPTIONAL {\
      ?verzoek a ?vt.\
      FILTER (?vt!=tlb:Verzoek)\
    }\
    BIND (if(bound(?vt),?vt,tlb:Verzoek) as ?vtype)\
  }\
  GRAPH <urn:name:types> {\
    ?vtype rdfs:label ?type.\
    ?vstatus rdfs:label ?status.\
    ?vstatus a tlb:OpenStatus.\
  }\
}\
ORDER BY DESC(?datum) LIMIT 100"
  );
  maak_history(queryParameters);
  return false;
}

function toetsingslogboek_(queryParameters) {
  setBreadcrumb(" / Toetsingslogboek");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html(
    '<p>Alle afgeronde verzoeken kunnen hier gevonden worden: <a rel="brc-link" menu-url="verzoeken.html">afgeronde verzoeken</a>.</p>\
  <p>Alle modellen in de modellenbibliotheek kunnen hier gevonden worden: <a rel="brc-link" menu-url="toetsingsmodellen.html">alle modellen</a>.</p>'
  );
  rdflib.fetchData(
    document.getElementById("table1"),
    '\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
SELECT ?_graph ?verzoek ?verzoek_label ?verzoek_glink ?status ?type (?_graph as ?model) ?model_label (?type as ?model_link) (?_graph as ?toetsing) ("Toetsing" as ?toetsing_label) ?modelstatus ?versie ?datum \
WHERE {\
  GRAPH <urn:name:toetsingslogboek> {\
    ?verzoek a tlb:Verzoek.\
    ?verzoek mb:code ?verzoek_label.\
    ?verzoek tlb:status ?vstatus.\
    ?verzoek tlb:jiraLink ?verzoek_glink.\
    ?verzoek tlb:datumVerzoek ?datumverzoek.\
  }\
  GRAPH <urn:name:types> {\
    ?vstatus rdfs:label ?status.\
    ?vstatus a tlb:OpenStatus.\
  }\
  OPTIONAL {\
    GRAPH <urn:name:toetsingslogboek> {\
      ?verzoek tlb:betreft ?_graph.\
    }\
    GRAPH ?_graph {\
      ?m a mb:Model.\
      ?m a ?maintype.\
      ?m rdfs:label ?model_label.\
      ?mv mb:versieVan ?m.\
      ?mv mb:versiedatum ?datum.\
      ?mv mb:versienummer ?versie.\
      ?mv mb:status ?mvstatus\
    } GRAPH <urn:name:types> {\
      ?maintype rdfs:label ?type.\
      ?mvstatus rdfs:label ?modelstatus.\
    }\
  }\
}\
ORDER BY DESC(?datumverzoek) LIMIT 100'
  );
  maak_history(queryParameters);
  return false;
}

function search(queryParameters) {
  setBreadcrumb(" / Zoeken");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  const term = $("[name=term]").val();
  $("#main-block-kop").html("<p>Zoekresultaten voor: <b>" + term + "</b></p>");

  // const term = urlParams.get("term").replace(/[^a-zA-Z0-9\s]/g, "");
  rdflib.fetchData(
    document.getElementById("table1"),
    '\
        PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
        SELECT ?_graph (?_graph as ?model) ?model_label ?type (?type as ?resultaat_link) ?resultaat ?resultaat_label\
        WHERE { GRAPH ?_graph {\
          ?mv a mb:Modelversie.\
          ?mv mb:status mb:Gepubliceerd.\
          ?mv rdfs:label ?model_label.\
          ?resultaat a ?maintype.\
          ?resultaat rdfs:label ?resultaat_label\
          FILTER(REGEX(?resultaat_label,"@TERM@"))\
          } GRAPH <urn:name:types> {\
            ?maintype rdfs:label ?type\
        }} ORDER BY (abs(strlen(?resultaat_label)-strlen("@TERM@"))) LIMIT 100',
    { term: term }
  );
  maak_history(queryParameters);
  return false;
}

function nav_LGD(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="kennisbanken.html">Kennisbanken</a> / LGD Model'
  );
  $("#main-block-inhoud").html(
    '<div class="row"><div class="col-3 scrollable"><ul class="tree" id="tree1"/></div><div class="col"><table class="table" id="table1"/></div></div>'
  );
  $("#main-block-kop").html("");

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
CONSTRUCT {\
  <@URI@> ?prop ?value.\
  <@URI@> tlb:kwaliteitslabel ?kwaliteitslabel.\
  ?prop rdfs:label ?proplabel.\
  tlb:kwaliteitslabel rdfs:label ?kwproplabel\
}\
WHERE {\
  GRAPH <@URI@> {\
    <@URI@> ?prop ?value.\
    FILTER (?prop=rdfs:label || ?prop=mb:versienummer || ?prop=mb:versiedatum || ?prop=mb:releaseDatum)\
  }\
  GRAPH <urn:name:types> {\
    ?prop rdfs:label ?proplabel.\
  }\
  OPTIONAL {\
    GRAPH <urn:name:toetsingslogboek> {\
      ?ts tlb:betreft <@URI@>.\
      ?ts tlb:kwaliteitslabel ?kw.\
    }\
    GRAPH <urn:name:types> {\
      ?kw rdfs:label ?kwaliteitslabel.\
      tlb:kwaliteitslabel rdfs:label ?kwproplabel\
    }\
  }\
}",
    { uri: graphuri }
  );
  const types = [
    "http://modellenbibliotheek.belastingdienst.nl/def/lgd#Entiteittype",
    "http://modellenbibliotheek.belastingdienst.nl/def/lgd#Relatietype",
    "http://modellenbibliotheek.belastingdienst.nl/def/lgd#Attribuutdomein",
  ];
  const propuri =
    "http://modellenbibliotheek.belastingdienst.nl/def/lgd#attribuut";
  const query =
    '\
        PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
        PREFIX lgd: <http://modellenbibliotheek.belastingdienst.nl/def/lgd#>\
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
        CONSTRUCT{\
            <@URI@>?p?o.\
            ?o rdfs:label ?olabel.\
            ?o <urn:ldt:link> ?type.\
            rdfs:label rdfs:label "Naam". \
            rdfs:isDefinedBy rdfs:label "In modelversie". \
            <@URI@> lgd:begrip ?begrip.\
            ?begrip rdfs:label ?blabel.\
            ?begrip <urn:ldt:link> "begrip".\
            ?begrip <urn:ldt:graph> ?bgraph.\
        } WHERE { GRAPH <@GRAPH@> {\
            <@URI@>?p?o.\
            ?modelversie a mb:Modelversie.\
            ?modelversie rdfs:label ?modelversielabel.\
            OPTIONAL {?o rdfs:label ?olabel}\
            FILTER (?p!=rdf:type && ?p!=lgd:begrip)\
        } OPTIONAL {\
            GRAPH <@GRAPH@> {?o a ?maintype}\
            GRAPH <urn:name:types> {?maintype rdfs:label ?type}\
        } OPTIONAL {\
          GRAPH <@GRAPH@> {\
             ?mv mb:afgeleidVan ?bgraph.\
            <@URI@> lgd:begrip ?begrip\
          }\
          GRAPH ?bgraph {?begrip rdfs:label ?blabel. ?begrip a skos:Concept}\
        }}';
  rdflib.fetchTree(
    document.getElementById("tree1"),
    document.getElementById("table1"),
    query,
    { graph: graphuri, types: types, lower: propuri }
  );
  maak_history(queryParameters);
  return false;
}

function nav_SM(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="kennisbanken.html">Kennisbanken</a> / Semantisch Model'
  );
  $("#main-block-inhoud").html(
    '<div class="row"><div class="col-3 scrollable"><ul class="tree" id="tree1"/></div><div class="col"><table class="table" id="table1"/></div></div>'
  );

  $("#main-block-kop").html("");

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
CONSTRUCT {\
<@URI@> ?prop ?value.\
<@URI@> tlb:kwaliteitslabel ?kwaliteitslabel.\
?prop rdfs:label ?proplabel.\
tlb:kwaliteitslabel rdfs:label ?kwproplabel\
}\
WHERE {\
GRAPH <@URI@> {\
  <@URI@> ?prop ?value.\
  FILTER (?prop=rdfs:label || ?prop=mb:versienummer || ?prop=mb:versiedatum || ?prop=mb:releaseDatum)\
}\
GRAPH <urn:name:types> {\
  ?prop rdfs:label ?proplabel.\
}\
OPTIONAL {\
  GRAPH <urn:name:toetsingslogboek> {\
    ?ts tlb:betreft <@URI@>.\
    ?ts tlb:kwaliteitslabel ?kw.\
  }\
  GRAPH <urn:name:types> {\
    ?kw rdfs:label ?kwaliteitslabel.\
    tlb:kwaliteitslabel rdfs:label ?kwproplabel\
  }\
}\
}",
    { uri: graphuri }
  );
  const classuri = "http://www.w3.org/2004/02/skos/core#Concept";
  const propuri = "http://www.w3.org/2004/02/skos/core#broader";
  const query =
    '\
        PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
        PREFIX kgr: <http://modellenbibliotheek.belastingdienst.nl/def/kgr#>\
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
        CONSTRUCT{\
            <@URI@>?p?o; mb:inModelversie ?modelversie.\
            ?modelversie rdfs:label ?modelversielabel.\
            ?o rdfs:label ?olabel.\
            ?o <urn:ldt:link> ?type.\
            <@URI@> kgr:kennisgebied ?kg.\
            ?kg rdfs:label ?kg_label.\
            <@URI@> a ?cl.\
            ?cl rdfs:label ?cl_label.\
            rdfs:label rdfs:label "Voorkeursterm". \
            skos:definition rdfs:label "Definitie".\
            skos:related rdfs:label "Gerelateerd".\
            skos:broader rdfs:label "Bovenliggend".\
            skos:scopeNote rdfs:label "Toelichting".\
            rdf:type rdfs:label "Classificatie".\
            kgr:kennisgebied rdfs:label "Kennisgebied".\
            mb:inModelversie rdfs:label "In model met versie".\
            mb:grondslag rdfs:label "Kennisbron(nen)".\
        } WHERE { GRAPH <@GRAPH@> {\
            <@URI@>?p?o.\
            ?modelversie a mb:Modelversie.\
            ?modelversie rdfs:label ?modelversielabel.\
            OPTIONAL {?o rdfs:label ?olabel}\
            FILTER (?p!=rdf:type && ?p!=skos:inScheme && ?p!=skos:hiddenLabel && ?p!=kgr:kennisgebied)\
          } OPTIONAL {\
            GRAPH <@GRAPH@> {<@URI@> kgr:kennisgebied ?kg}\
            GRAPH <urn:name:kennisgebiedenregister> {?kg rdfs:label ?kg_label}\
          } OPTIONAL {\
            GRAPH <@GRAPH@> {<@URI@> a ?cl}\
            GRAPH <urn:name:jas> {?cl rdfs:label ?cl_label}\
          } OPTIONAL {\
            GRAPH <@GRAPH@> {?o a ?maintype}\
            GRAPH <urn:name:types> {?maintype rdfs:label ?type}\
        }}';
  rdflib.fetchTree(
    document.getElementById("tree1"),
    document.getElementById("table1"),
    query,
    { graph: graphuri, class: classuri, upper: propuri }
  );
  maak_history(queryParameters);
  return false;
}

function nav_begrip(queryParameters) {
  query_begrip(queryParameters);
  return false;
}

function nav_broader(queryParameters) {
  query_begrip(queryParameters);
  return false;
}

function nav_related(queryParameters) {
  query_begrip(queryParameters);
  return false;
}

function query_begrip(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="kennisbanken.html">Kennisbanken</a> / Semantisch Model / Begrippen'
  );
  $("#main-block-inhoud").html(
    '<div class="row"><div class="col-3 scrollable"><ul class="tree" id="tree1"></table></div><div class="col"><table class="table" id="table1"></table></div></div>'
  );
  $("#main-block-kop").html("");

  const graphquery =
    "\
    PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
    SELECT distinct ?graph WHERE {\
      GRAPH ?graph {\
        <@URI@> a ?t.\
        ?mv a mb:Modelversie.\
        ?mv mb:versiedatum ?newest.\
      }\
      FILTER NOT EXISTS {\
        GRAPH ?ngraph {\
          <@URI@> a ?nt.\
          ?nmv a mb:Modelversie.\
          ?nmv mb:versiedatum ?newer.\
          FILTER (?newer>?newest)\
        }\
      }\
    }\
  ";
  rdflib.fetchValue(graphuri, graphquery, { uri: subjecturi }, (graphuri) => {
    const classuri = "http://www.w3.org/2004/02/skos/core#Concept";
    const propuri = "http://www.w3.org/2004/02/skos/core#broader";
    const query =
      '\
      PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
      PREFIX kgr: <http://modellenbibliotheek.belastingdienst.nl/def/kgr#>\
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
      CONSTRUCT{\
          <@URI@>?p?o; mb:inModelversie ?modelversie.\
          ?modelversie rdfs:label ?modelversielabel.\
          ?o rdfs:label ?olabel.\
          ?o <urn:ldt:link> ?type.\
          <@URI@> kgr:kennisgebied ?kg.\
          ?kg rdfs:label ?kg_label.\
          <@URI@> a ?cl.\
          ?cl rdfs:label ?cl_label.\
          rdfs:label rdfs:label "Voorkeursterm". \
          skos:definition rdfs:label "Definitie".\
          skos:related rdfs:label "Gerelateerd".\
          skos:broader rdfs:label "Bovenliggend".\
          skos:scopeNote rdfs:label "Toelichting".\
          rdf:type rdfs:label "Classificatie".\
          kgr:kennisgebied rdfs:label "Kennisgebied".\
          mb:inModelversie rdfs:label "In model met versie".\
          mb:grondslag rdfs:label "Kennisbron(nen)".\
      } WHERE { GRAPH <@GRAPH@> {\
          <@URI@>?p?o.\
          ?modelversie a mb:Modelversie.\
          ?modelversie rdfs:label ?modelversielabel.\
          OPTIONAL {?o rdfs:label ?olabel}\
          FILTER (?p!=rdf:type && ?p!=skos:inScheme && ?p!=skos:hiddenLabel && ?p!=kgr:kennisgebied)\
        } OPTIONAL {\
          GRAPH <@GRAPH@> {<@URI@> kgr:kennisgebied ?kg}\
          GRAPH <urn:name:kennisgebiedenregister> {?kg rdfs:label ?kg_label}\
        } OPTIONAL {\
          GRAPH <@GRAPH@> {<@URI@> a ?cl}\
          GRAPH <urn:name:jas> {?cl rdfs:label ?cl_label}\
        } OPTIONAL {\
          GRAPH <@GRAPH@> {?o a ?maintype}\
          GRAPH <urn:name:types> {?maintype rdfs:label ?type}\
      }}';
    rdflib.fetchTree(
      document.getElementById("tree1"),
      document.getElementById("table1"),
      query,
      { graph: graphuri, class: classuri, upper: propuri }
    );
    rdflib.fetchTriples(document.getElementById("table1"), query, {
      uri: subjecturi,
      graph: graphuri,
    });
  });
  maak_history(queryParameters);
  return false;
}

function nav_kennisgebied(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="kennisgebiedenregister.html">Kennisgebiedenregister</a> / Kennisgebied'
  );
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> ?p ?o.\
  ?o rdfs:label ?olabel\
}\
WHERE {\
  GRAPH <urn:name:kennisgebiedenregister> {\
    <@URI@> ?p ?o\
    OPTIONAL {?o rdfs:label ?olabel}\
  }\
}",
    { uri: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_BegrippenMetOnbekendeKennisbron(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Begrippen met onbekende kennisbron'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande begrippen hebben wel een verwijzing naar een kennisbron, maar die verwijzing kan niet verbonden worden met in het model gespecificeerde kennisbron</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
  CONSTRUCT {\
    <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
  }\
  WHERE {\
    GRAPH <@URI@> {\
      ?mb a mb:Modelversie.\
      ?mb rdfs:label ?label.\
      ?mb mb:versienummer ?versienummer.\
      ?mb mb:versiedatum ?versiedatum.\
    }\
  }",
    { uri: graphuri }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
  PREFIX dct: <http://purl.org/dc/terms/>\
  PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
  SELECT ?begrip ?begrip_label ?kennisbronverwijzing \
  WHERE {\
    GRAPH <@GRAPH@> {\
      ?begrip a skos:Concept.\
      ?begrip rdfs:label ?begrip_label.\
      ?begrip mb:grondslag ?kbv.\
      ?kbv rdfs:label ?kennisbronverwijzing.\
      FILTER NOT EXISTS {\
        {?kbv dct:isPartOf ?kennisbron}\
        UNION\
        {?kbv dct:title ?title}\
      }\
    }\
  }",
    { graph: graphuri }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_BegrippenMetVerwijsfouten(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Begrippen met verwijsfouten'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html("");

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    '\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
SELECT ?begrip ?begrip_label (replace(?or,"\\\\[([^]]+)]","==>[$1]<==") as ?definitie)\
WHERE {\
  {\
    SELECT (?x as ?begrip) (?x_label as ?begrip_label) (replace(?o,concat("\\\\[(",?labels,")]"),"$1") as ?or)\
    WHERE {\
      {\
        SELECT ?x ?x_label (count(?s) as ?nr) ?o (strlen(replace(?o,"[^\\\\[]","")) as ?cnt) (group_concat(?slabel; separator="|") as ?labels) \
        WHERE {\
          GRAPH <@GRAPH@> {\
            ?x skos:definition ?o.\
            ?x rdfs:label ?x_label.\
            FILTER (regex(?o,"\\\\[.+\\\\]"))\
            FILTER (!regex(?o,"\\\\[[a-zA-Z]+\\\\..+\\\\]"))\
            OPTIONAL {\
              ?s a skos:Concept.\
              ?s rdfs:label ?slabel.\
              FILTER (REGEX(?o,concat("\\\\[",?slabel,"\\\\]")))\
            }\
          }\
        }\
        GROUP BY ?x ?x_label ?o\
      }\
      FILTER (?nr!=?cnt)\
    }\
  }\
  FILTER (REGEX(?or,"\\\\[.+]","i"))\
}',
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_BegrippenZonderKennisbron(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Begrippen zonder kennisbron'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html("");

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
SELECT ?begrip ?begrip_label ?definitie \
WHERE {\
  GRAPH <@GRAPH@> {\
    ?begrip a skos:Concept.\
    ?begrip rdfs:label ?begrip_label.\
    OPTIONAL {?begrip skos:definition ?definitie}\
    FILTER NOT EXISTS {?begrip mb:grondslag ?kennisbron}\
  }\
}",
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_BegrippenZonderLineage(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Begrippen zonder horizontale lineage'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande begrippen hebben geen relaties naar andere begrippen. Vaak komt dat omdat in de definitie niet met blokhaaken [..] naar een begrip wordt verwezen. Ook kan het voorkomen dat er wel blokhaken zijn gebruikt, maar het betreffende begrip kan niet gevonden worden, waardoor er geen relatie is gelegd.</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
SELECT ?begrip ?begrip_label ?definitie \
WHERE {\
  GRAPH <@GRAPH@> {\
    ?begrip a skos:Concept.\
    ?begrip rdfs:label ?begrip_label.\
    OPTIONAL {?begrip skos:definition ?definitie}\
    FILTER NOT EXISTS {\
      ?begrip ?p ?srel.\
      ?srel a skos:Concept\
    }\
  }\
}",
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_Kennisbrongebruik(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Kennisbrongebruik'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    '<p>Onderstaande lijst geeft het overzicht van aantal verwijzingen naar een in dit model gespecificeerde kennisbron. Bij nul begrippen is sprake van een kennisbron die onnodig opgenomen is in dit model, of de verwijzingen naar deze kennisbron kloppen niet. Verwijzingen werken alleen als deze verwijzingen eindigen op de waarde in de kolom "link". Deze kolom mag niet leeg zijn.</p>'
  );
  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
<@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
GRAPH <@URI@> {\
?mb a mb:Modelversie.\
?mb rdfs:label ?label.\
?mb mb:versienummer ?versienummer.\
?mb mb:versiedatum ?versiedatum.\
}\
}",
    { uri: graphuri }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
PREFIX dct: <http://purl.org/dc/terms/>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
SELECT ?kennisbron ?kennisbron_label (count(?begrip) as ?begrippen) ?link \
WHERE {\
GRAPH <@GRAPH@> {\
?kennisbron a dct:BibliographicResource.\
?kennisbron rdfs:label ?kennisbron_label.\
?kennisbron dct:alternative ?link\
OPTIONAL {\
  ?begrip a skos:Concept.\
  ?begrip mb:grondslag/(dct:isPartOf*) ?kennisbron\
}\
}\
} GROUP BY ?link ?kennisbron ?kennisbron_label ORDER BY ?begrippen",
    { graph: graphuri }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_LGDElementenIncorrecteLineage(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / LGD Elementen met incorrecte lineage'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande LGD modelelementen hebben verwijzen niet naar een begrip in hetzelfde kennis(deel)gebied. Hierboven is aangegeven welke versie van het semantisch model daarbij wordt gebruikt. Als dit niet wordt getoond, of alleen een URI (en geen naam), dan kan het betreffende semantische model niet gevonden worden (en zullen alle modelelementen geen correcte lineage hebben).</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum.\
  <@URI@> mb:afgeleidVan ?model.\
  ?model rdfs:label ?model_label\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
  }\
  OPTIONAL {\
    GRAPH <@URI@> {?mb mb:afgeleidVan ?model}\
    OPTIONAL {GRAPH ?model {?amb a mb:Modelversie. ?amb rdfs:label ?model_label}}\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    '\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
PREFIX lgd: <http://modellenbibliotheek.belastingdienst.nl/def/lgd#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
SELECT (strafter(str(?type),"#") as ?elementtype) ?parent ?parent_label ?modelelement ?modelelement_label (replace(?gegevensdefinitie,concat("\\\\[(",if(bound(?begrippen),?begrippen,""),")]"),"$1") as ?gd) \
WHERE {\
  {\
    SELECT ?parent ?parent_label ?type ?modelelement ?modelelement_label (count(?s) as ?nr) ?gegevensdefinitie (strlen(replace(?gegevensdefinitie,"[^\\\\[]","")) as ?cnt) (group_concat(?slabel; separator="|") as ?begrippen) \
    WHERE {\
      GRAPH <@GRAPH@> {\
        {\
          ?me a ?type.\
          ?me lgd:gegevensdefinitie ?gegevensdefinitie.\
          ?me rdfs:label ?modelelement_label.\
          FILTER (regex(?gegevensdefinitie,"\\\\[.+\\\\]"))\
          FILTER (!regex(?gegevensdefinitie,"\\\\[[a-zA-Z]+\\\\..+\\\\]"))\
          OPTIONAL {\
            ?parent lgd:attribuut ?me.\
            ?parent rdfs:label ?parent_label\
          }\
          BIND (?me as ?modelelement)\
        }\
        UNION\
        {\
          ?me a ?type.\
          ?me rdfs:label ?gegevensdefinitie.\
          ?me lgd:waarde ?modelelement.\
          FILTER (regex(?gegevensdefinitie,"\\\\[.+\\\\]"))\
          FILTER (!regex(?gegevensdefinitie,"\\\\[[a-zA-Z]+\\\\..+\\\\]"))\
          OPTIONAL {\
            ?parent lgd:lijstbeperking ?lijstbeperking.\
            ?parent rdfs:label ?parent_label.\
            ?lijstbeperking ?seq ?me\
          }\
        }\
      }\
      OPTIONAL {\
        GRAPH <@GRAPH@> {\
          ?modelversie mb:afgeleidVan ?semantischmodel.\
          ?me lgd:begrip ?s\
        }\
        GRAPH ?semantischmodel {\
          ?s a skos:Concept.\
          ?s rdfs:label ?slabel.\
        }\
      }\
    }\
    GROUP BY ?parent ?parent_label ?type ?modelelement ?modelelement_label ?gegevensdefinitie\
  }\
  FILTER (?nr!=?cnt)\
}',
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_LGDElementenZonderLineage(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / LGD Elementen zonder lineage'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande LGD modelelementen verwijzen niet naar een begrip in hetzelfde kennis(deel)gebied.</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    '\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX lgd: <http://modellenbibliotheek.belastingdienst.nl/def/lgd#>\
SELECT (strafter(str(?ptype),"#") as ?parenttype) ?parent ?parent_label (strafter(str(?type),"#") as ?elementtype) ?modelelement ?modelelement_label ?gegevensdefinitie \
WHERE {\
  GRAPH <@GRAPH@> {\
    {\
        {\
        ?modelelement a ?type.\
        ?modelelement lgd:gegevensdefinitie ?gegevensdefinitie.\
        ?modelelement rdfs:label ?modelelement_label.\
        FILTER (!regex(?gegevensdefinitie,"\\\\[.+\\\\]"))\
        }\
        UNION\
        {\
        ?modelelement a ?type.\
        ?modelelement rdfs:label ?modelelement_label.\
        FILTER NOT EXISTS {?modelelement lgd:gegevensdefinitie ?gegevensdefinitie}\
        }\
    }\
    OPTIONAL {\
        ?parent lgd:attribuut ?modelelement.\
        ?parent a ?ptype.\
        ?parent rdfs:label ?parent_label\
    }\
    FILTER (?type = lgd:Relatietype || ?type = lgd:Entiteittype || ?ptype = lgd:Entiteittype)\
  }\
}',
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_LosseEntiteittypen(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Losse entiteittypen'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande entiteittypen hebben geen enkele relatie met een ander element in het LGD. Hoewel dit niet in alle gevallen foutief is, kan het wel een indicatie zijn op een overbodig uitgewerkt stukje model of een entiteittype dat per ongeluk nog is achtergebleven in het opgeleverde model.</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum.\
  <@URI@> mb:gebruikt ?model.\
  ?model rdfs:label ?model_label\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
  }\
  OPTIONAL {\
    GRAPH <@URI@> {?mb mb:gebruikt ?model}\
    OPTIONAL {GRAPH ?model {?amb a mb:Modelversie. ?amb rdfs:label ?model_label}}\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX lgd: <http://modellenbibliotheek.belastingdienst.nl/def/lgd#>\
SELECT ?entiteittype ?entiteittype_label \
WHERE {\
  GRAPH <@GRAPH@> {\
    ?entiteittype a lgd:Entiteittype.\
    ?entiteittype rdfs:label ?entiteittype_label.\
    FILTER NOT EXISTS {\
      {\
        ?modelelement ?rel ?entiteittype.\
        FILTER (?rel=lgd:vanEntiteittype || ?rel=lgd:naarEntiteittype)\
      }\
      UNION\
      {\
        ?entiteittype ?rel2 ?modelelement2.\
        FILTER (?rel2=lgd:specialisatieVan)\
      }\
    }\
  }\
}",
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_OntbrekendeAttribuutdomeinen(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Ontbrekende attribuutdomeinen'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Bij onderstaande attribuuttypen is geen attribuutdomein gespecificeerd, of wordt verwezen naar een onbekend attribuutdomein.</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum.\
  <@URI@> mb:gebruikt ?model.\
  ?model rdfs:label ?model_label\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
    ?mb mb:gebruikt ?model.\
  }\
  OPTIONAL {\
    GRAPH <@URI@> {?mb mb:gebruikt ?model}\
    OPTIONAL {GRAPH ?model {?amb a mb:Modelversie. ?amb rdfs:label ?model_label}}\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    '\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX lgd: <http://modellenbibliotheek.belastingdienst.nl/def/lgd#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
SELECT (strafter(str(?parent_type),"#") as ?parenttype) ?parent ?parent_label ?attribuuttype ?attribuuttype_label ?attribuutdomein ?gevondenin ?gevondenin_label \
WHERE {\
  {\
    GRAPH <@GRAPH@> {\
      ?attribuuttype a lgd:Attribuuttype.\
      ?attribuuttype rdfs:label ?attribuuttype_label.\
      ?parent lgd:attribuut ?attribuuttype.\
      ?parent rdfs:label ?parent_label.\
      ?parent a ?parent_type.\
      FILTER NOT EXISTS {?attribuuttype lgd:attribuutdomein ?attribuutdomeinmissing}\
    }\
  }\
  UNION\
  {\
    GRAPH <@GRAPH@> {\
      ?attribuuttype a lgd:Attribuuttype.\
      ?attribuuttype rdfs:label ?attribuuttype_label.\
      ?parent lgd:attribuut ?attribuuttype.\
      ?parent rdfs:label ?parent_label.\
      ?parent a ?parent_type.\
      ?attribuuttype lgd:attribuutdomein ?attribuutdomein.\
      FILTER NOT EXISTS {?attribuutdomein a lgd:Attribuutdomein}\
    }\
    OPTIONAL {\
      GRAPH ?gevondenin {\
        ?attribuutdomein a lgd:Attribuutdomein.\
        ?model a mb:Model.\
        ?model rdfs:label ?gevondenin_label\
      }\
    }\
    FILTER NOT EXISTS {\
      GRAPH <@GRAPH@> {\
        ?modelversie a mb:Modelversie.\
        ?modelversie mb:gebruikt* ?gebruiktmodel\
      }\
      GRAPH ?gebruiktmodel {\
        ?attribuutdomein a lgd:Attribuutdomein\
      }\
    }\
  }\
}',
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_OverbodigeAttribuutdomeinen(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Overbodige attribuutdomeinen'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande attribuutdomeinen worden niet gebruikt in het model, maar zijn wel onderdeel van het model (NB: shortcuts zijn al uit dit overzicht gefiltered)</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
  GRAPH <@URI@> {\
    ?mb a mb:Modelversie.\
    ?mb rdfs:label ?label.\
    ?mb mb:versienummer ?versienummer.\
    ?mb mb:versiedatum ?versiedatum.\
  }\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX lgd: <http://modellenbibliotheek.belastingdienst.nl/def/lgd#>\
SELECT ?attribuutdomein ?attribuutdomein_label \
WHERE {\
  GRAPH <@GRAPH@> {\
    ?attribuutdomein a lgd:Attribuutdomein.\
    ?attribuutdomein rdfs:label ?attribuutdomein_label.\
    FILTER NOT EXISTS {?attribuuttype lgd:attribuutdomein ?attribuutdomein}\
  }\
}",
    { graph: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  // Bewaar de huidige parameters voor breadcrumb
  toetsing_param = queryParameters;
  // console.log(toetsing_param);
  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / Toetsing'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande tabel geeft een overzicht van de toetsingen die uitgevoerd kunnen worden voor dit model</p>"
  );

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
  PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
  CONSTRUCT {\
    <@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum.\
    <@URI@> tlb:toetsingsrapport ?toetsingsrapport.\
    ?toetsingsrapport rdfs:label ?rapportversie.\
  }\
  WHERE {\
    GRAPH <@URI@> {\
      ?mb a mb:Modelversie.\
      ?mb rdfs:label ?label.\
      ?mb mb:versienummer ?versienummer.\
      ?mb mb:versiedatum ?versiedatum.\
    }\
    OPTIONAL {\
      GRAPH ?trgraph {\
        ?toetsing tlb:betreft ?mb.\
        ?toetsingsrapport tlb:toetsing ?toetsing.\
        ?toetsingsrapport mb:versienummer ?rapportversie\
      }\
    }\
  }",
    { uri: graphuri }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    '\
  PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  SELECT (<@GRAPH@> as ?toetsing) (concat("toetsing_",strafter(str(?tst),"#")) as ?toetsing_link) ?toetsing_label \
  WHERE {\
    GRAPH <@GRAPH@> {\
      ?mb a ?modeltype.\
    }\
    GRAPH <urn:name:toetsingen> {\
      ?tst rdfs:label ?toetsing_label.\
      ?tst rdfs:seeAlso ?modeltype\
    }\
  }',
    { graph: graphuri }
  );
  maak_history(queryParameters);
  return false;
}

function nav_triples(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb("");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  const graphparam = graphuri;
  const querypre = "?query=construct%7B%3Fs%3Fp%3Fo%7Dwhere%7Bgraph%3C";
  const querypost = "%3E%7B%3Fs%3Fp%3Fo%7D%7D";
  window.location.replace(endpoint + querypre + graphparam + querypost);
  maak_history(queryParameters);
  return false;
}

function nav_wijziging(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="kennisgebiedenregister.html">Kennisgebiedenregister</a> / <a onclick="affilatie();return false;">Affiliatie</a> / Wijziging'
  );
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
  <@URI@> ?p ?o.\
  ?o rdfs:label ?olabel\
}\
WHERE {\
  GRAPH <urn:name:kennisgebiedenregister> {\
    <@URI@> ?p ?o\
    OPTIONAL {?o rdfs:label ?olabel}\
  }\
}",
    { uri: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nieuw_type(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_type");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_afbakeningstype(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_afbakeningstype");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_domein(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_domein");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_grondslag(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_grondslag");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_status(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_status");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_isDefinedBy(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_isDefinedBy");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_related(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_related");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_inModelversie(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_inModelversie");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nieuw_kennisbron(queryParameters) {
  let graphuri = queryParameters.graphuri;
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(" / nieuw_kennisbron");
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  maak_history(queryParameters);
  return false;
}

function nav_toetsingskader(queryParameters) {
  /* let graphuri = queryParameters.graphuri; */
  const graphuri = "urn:name:toetsingskader";
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / Toetsingskader'
  );
  $("#main-block-inhoud").html(
    '<div class="row"><div class="col-3 scrollable"><ul class="tree" id="tree1"></table></div><div class="col"><table class="table" id="table1"></table></div></div>'
  );
  $("#main-block-kop").html("");

  const query =
    '\
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
          PREFIX dqv: <http://www.w3.org/ns/dqv#>\
          PREFIX sh: <http://www.w3.org/ns/shacl#>\
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
          CONSTRUCT{\
              <@URI@>?p?o.\
              ?o rdfs:label ?olabel.\
              <@URI@> sh:in ?v.\
              ?v rdfs:label ?vlabel.\
              <@URI@> foaf:page ?info.\
              ?info <urn:ldt:glink> ?info.\
              ?info rdfs:label "Confluence space Modelautoriteit".\
              rdfs:comment rdfs:label "Toelichting".\
              foaf:page rdfs:label "Meer informatie".\
              sh:in rdfs:label "Mogelijke waarden".\
          } WHERE { GRAPH <@GRAPH@> {\
              <@URI@>?p?o.\
              FILTER (?p!=rdf:type && ?p!=dqv:inDimension && ?p!=sh:property && ?p!=foaf:page)\
              OPTIONAL {?o rdfs:label ?olabel}\
              OPTIONAL {\
                <@URI@> sh:property/sh:in/rdf:rest*/rdf:first ?v.\
                ?v rdfs:label ?vlabel\
              }\
              OPTIONAL {<@URI@> foaf:page ?info}\
          }}';
  rdflib.fetchTriples(document.getElementById("table1"), query, {
    uri: subjecturi,
    graph: graphuri,
  });
  const classuri = "http://www.w3.org/ns/dqv#Metric";
  const propuri = "http://www.w3.org/ns/dqv#inDimension";
  const types = ["http://www.w3.org/ns/dqv#Dimension"];
  rdflib.fetchTree(
    document.getElementById("tree1"),
    document.getElementById("table1"),
    query,
    { graph: graphuri, upper: propuri, types: types }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsingsrapport(queryParameters) {
  let subjecturi = queryParameters.subjecturi;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / Toetsingsrapport'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table>\
    <ul class="nav nav-tabs" id="myTab" role="tablist">\
      <li class="nav-item" role="presentation">\
        <button class="nav-link active" id="kwaliteitslabel-tab" data-bs-toggle="tab" data-bs-target="#kwaliteitslabel" type="button" role="tab" aria-controls="kwaliteitslabel" aria-selected="true">Kwaliteitslabel</button>\
      </li>\
      <li class="nav-item" role="presentation">\
        <button class="nav-link" id="dimensies-tab" data-bs-toggle="tab" data-bs-target="#dimensies" type="button" role="tab" aria-controls="dimensies" aria-selected="false">Dimensies</button>\
      </li>\
      <li class="nav-item" role="presentation">\
        <button class="nav-link" id="metingen-tab" data-bs-toggle="tab" data-bs-target="#metingen" type="button" role="tab" aria-controls="metingen" aria-selected="false">Metingen</button>\
      </li>\
      <li class="nav-item" role="presentation">\
        <button class="nav-link" id="advies-tab" data-bs-toggle="tab" data-bs-target="#advies" type="button" role="tab" aria-controls="advies" aria-selected="false">Advies</button>\
      </li>\
    </ul>\
    <div class="tab-content" id="myTabContent">\
      <div class="tab-pane fade show active" id="kwaliteitslabel" role="tabpanel" aria-labelledby="kwaliteitslabel-tab">\
        <p>De Modelautoriteit heeft het volgende kwaliteitslabel toegekend:</p>\
        <p style="font-size:40px;" id="kwlabel">?</p>\
      </div>\
      <div class="tab-pane fade" id="dimensies" role="tabpanel" aria-labelledby="dimensies-tab">\
        <p>Onderstaande tabel geeft het oordeel van de Modelautoriteit per toetsdimensie:</p>\
        <table class="table" id="table4"></table>\
      </div>\
      <div class="tab-pane fade" id="metingen" role="tabpanel" aria-labelledby="metingen-tab">\
        <p>Onderstaande tabel geeft inzicht in de kwaliteit van het model</p>\
        <table class="table" id="table2"></table>\
      </div>\
      <div class="tab-pane fade" id="advies" role="tabpanel" aria-labelledby="advies-tab">\
        <p>Onderstaande tabel geeft een overzicht van de adviezen van de Modelautoriteit</p>\
        <table class="table" id="table3"></table>\
      </div>\
    </div>\
  '
  );
  $("#main-block-kop").html("");
  rdflib.fetchValue(
    null,
    "\
       PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
       PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
       SELECT ?kwaliteitslabel \
       WHERE {\
         GRAPH ?trgraph {<@URI@> tlb:toetsing/tlb:kwaliteitslabel ?kwlabel}\
         GRAPH <urn:name:types> {?kwlabel rdfs:label ?kwaliteitslabel}\
       }\
     ",
    { uri: subjecturi },
    (kwlabel) => {
      const kwlabelfield = document.getElementById("kwlabel");
      kwlabelfield.innerHTML = kwlabel;
    }
  );
  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
CONSTRUCT {\
<@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum.\
<@URI@> tlb:toetsingsrapport ?rapportversie.\
}\
WHERE {\
GRAPH ?trgraph {\
  <@URI@> tlb:toetsing ?toetsing.\
  <@URI@> mb:versienummer ?rapportversie.\
  ?toetsing tlb:betreft ?mb.\
}\
GRAPH ?mb {\
  ?mb a mb:Modelversie.\
  ?mb rdfs:label ?label.\
  ?mb mb:versienummer ?versienummer.\
  ?mb mb:versiedatum ?versiedatum.\
}\
}",
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    '\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX dct: <http://purl.org/dc/terms/>\
SELECT ?dimensie ?dimensie_label ("toetsingskader" as ?dimensie_link) ?oordeel ?meetindicator ?meetindicator_label ("toetsingskader" as ?meetindicator_link) ?titel ?waarde ?waarde_label \
WHERE {\
GRAPH ?trgraph {\
  <@URI@> tlb:toetsing ?toetsing.\
  ?toetsing tlb:meetoordeel ?meetoordeel.\
  ?meetoordeel tlb:toetsdimensie ?dimensie.\
  ?meetoordeel tlb:oordeel ?mo.\
  ?meetoordeel tlb:meeting ?meeting.\
  ?meeting tlb:meetindicator ?meetindicator.\
  ?meeting tlb:waarde ?waarde.\
}\
OPTIONAL {GRAPH <urn:name:toetsingskader> {?dimensie rdfs:label ?dimensie_label}}\
OPTIONAL {GRAPH <urn:name:toetsingskader> {\
  ?meetindicator rdfs:label ?meetindicator_label.\
  ?meetindicator dct:title ?titel.\
}}\
OPTIONAL {GRAPH <urn:name:toetsingskader> {?mo rdfs:label ?oordeel}}\
OPTIONAL {GRAPH <urn:name:toetsingskader> {?waarde rdfs:label ?waarde_label}}\
} ORDER BY ?dimensie ?meetindicator',
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table4"),
    '\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX dct: <http://purl.org/dc/terms/>\
SELECT ?dimensie ?dimensie_label ("toetsingskader" as ?dimensie_link) ?oordeel ?toelichting \
WHERE {\
GRAPH ?trgraph {\
  <@URI@> tlb:toetsing ?toetsing.\
  ?toetsing tlb:meetoordeel ?meetoordeel.\
  ?meetoordeel tlb:toetsdimensie ?dimensie.\
  ?meetoordeel tlb:oordeel ?mo.\
  OPTIONAL {?meetoordeel tlb:toelichting ?toelichting}\
}\
OPTIONAL {GRAPH <urn:name:toetsingskader> {?dimensie rdfs:label ?dimensie_label}}\
OPTIONAL {GRAPH <urn:name:toetsingskader> {?mo rdfs:label ?oordeel}}\
} ORDER BY ?dimensie',
    { uri: subjecturi }
  );
  rdflib.fetchData(
    document.getElementById("table3"),
    "\
PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
SELECT ?advies ?advies_label ?titel ?toelichting ?verwachting \
WHERE {\
GRAPH ?trgraph {\
  <@URI@> tlb:toetsing ?toetsing.\
  ?toetsing tlb:advies ?advies.\
  ?advies rdfs:label ?advies_label.\
  ?advies rdfs:comment ?titel.\
  ?advies tlb:toelichting ?toelichting.\
  ?advies tlb:verwachtResultaat ?verwachting.\
}\
} ORDER BY ?advies",
    { uri: subjecturi }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_BegrippenMetCirkelverwijzing(queryParameters) {
  let graphuri = queryParameters.graphuri;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Begrippen met cirkelverwijzing'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaande begrippen hebben een directe of indirecte cirkelverwijzing. Dit ontstaat als in een definitie van een begrip naar dit begrip zelf wordt verwezen, of als er via verwijzingen in definities een lus te maken is (A->B->..->Z->A</p>"
  );
  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
<@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
GRAPH <@URI@> {\
?mb a mb:Modelversie.\
?mb rdfs:label ?label.\
?mb mb:versienummer ?versienummer.\
?mb mb:versiedatum ?versiedatum.\
}\
}",
    { uri: graphuri }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
SELECT ?begrip ?begrip_label ?definitie \
WHERE {\
GRAPH <@GRAPH@> {\
?begrip a skos:Concept.\
?begrip rdfs:label ?begrip_label.\
?begrip skos:related+ ?begrip.\
OPTIONAL {?begrip skos:definition ?definitie}\
}\
}",
    { graph: graphuri }
  );
  maak_history(queryParameters);
  return false;
}

function nav_toetsing_KennisbronnenZonderVindbareLocatie(queryParameters) {
  let graphuri = queryParameters.graphuri;

  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / <a onclick="toetsing_return()">Toetsing</a> / Kennisbronnen zonder vindbare locatie'
  );
  $("#main-block-inhoud").html(
    '<table class="table" id="table1"></table><table class="table" id="table2"></table>'
  );
  $("#main-block-kop").html(
    "<p>Onderstaan overzicht geeft alle kennisbronnen weer die geen vindbare bronlocatie hebben. Dit zijn kennisbronnen zonder enige bronlocatie en kennisbronnen met een bronlocatie die geen URL betreft, maar slechts een tekstuele verwijzing.</p>"
  );
  rdflib.fetchTriples(
    document.getElementById("table1"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
CONSTRUCT {\
<@URI@> rdfs:label ?label; mb:versienummer ?versienummer; mb:versiedatum ?versiedatum\
}\
WHERE {\
GRAPH <@URI@> {\
?mb a mb:Modelversie.\
?mb rdfs:label ?label.\
?mb mb:versienummer ?versienummer.\
?mb mb:versiedatum ?versiedatum.\
}\
}",
    { uri: graphuri }
  );
  rdflib.fetchData(
    document.getElementById("table2"),
    "\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
PREFIX dct: <http://purl.org/dc/terms/>\
PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
SELECT ?kennisbron ?kennisbron_label ?bronlocatie \
WHERE {\
GRAPH <@GRAPH@> {\
{\
    ?kennisbron a dct:BibliographicResource.\
    ?kennisbron rdfs:label ?kennisbron_label.\
    ?kennisbron dct:alternative ?alt.\
    FILTER NOT EXISTS {?kennisbron dct:bibliographicCitation ?bronlocatie}\
}\
UNION\
{\
    ?kennisbron a dct:BibliographicResource.\
    ?kennisbron rdfs:label ?kennisbron_label.\
    ?kennisbron dct:bibliographicCitation ?bronlocatie.\
    ?kennisbron dct:alternative ?alt.\
    FILTER (!isIRI(?bronlocatie))\
}\
}\
} ORDER BY ?bronlocatie",
    { graph: graphuri }
  );
  maak_history(queryParameters);
  return false;
}

function verzoeken(queryParameters) {
  let graphuri = queryParameters.graphuri;
  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / Afgeronde verzoeken'
  );
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");

  rdflib.fetchData(
    document.getElementById("table1"),
    '\
  PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
  PREFIX tlb: <http://modellenbibliotheek.belastingdienst.nl/def/tlb#>\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  SELECT ?_graph ?verzoek ?verzoek_label ?verzoek_glink ?status ?type (?_graph as ?model) ?model_label (?type as ?model_link) (?_graph as ?toetsing) ("Toetsing" as ?toetsing_label) ?modelstatus ?versie ?datum \
  WHERE {\
    GRAPH <urn:name:toetsingslogboek> {\
      ?verzoek a tlb:Verzoek.\
      ?verzoek mb:code ?verzoek_label.\
      ?verzoek tlb:status ?vstatus.\
      ?verzoek tlb:jiraLink ?verzoek_glink.\
      ?verzoek tlb:datumVerzoek ?datumverzoek.\
    }\
    GRAPH <urn:name:types> {\
      ?vstatus rdfs:label ?status\
    }\
    OPTIONAL {\
      GRAPH <urn:name:toetsingslogboek> {\
        ?verzoek tlb:betreft ?_graph.\
      }\
      GRAPH ?_graph {\
        ?m a mb:Model.\
        ?m a ?maintype.\
        ?m rdfs:label ?model_label.\
        ?mv mb:versieVan ?m.\
        ?mv mb:versiedatum ?datum.\
        ?mv mb:versienummer ?versie.\
        ?mv mb:status ?mvstatus\
      } GRAPH <urn:name:types> {\
        ?maintype rdfs:label ?type.\
        ?mvstatus rdfs:label ?modelstatus.\
      }\
    }\
  }\
  ORDER BY DESC(?datumverzoek) LIMIT 100'
  );
  maak_history(queryParameters);
  return false;
}

function toetsingsmodellen(queryParameters) {
  let graphuri = queryParameters.graphuri;
  setBreadcrumb(
    ' / <a rel="brc-link" menu-url="toetsingslogboek_.html">Toetsingslogboek</a> / Alle modellen'
  );
  $("#main-block-inhoud").html('<table class="table" id="table1"></table>');
  $("#main-block-kop").html("");
  rdflib.fetchData(
    document.getElementById("table1"),
    '\
  PREFIX mb: <http://modellenbibliotheek.belastingdienst.nl/def/mb#>\
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
  SELECT ?status ?_graph ?type (?_graph as ?model) ?model_label (?type as ?model_link) (?_graph as ?toetsing) ("Toetsing" as ?toetsing_label) ?versie ?datum ?publicatiedatum ?publicatie_van \
  WHERE {\
    GRAPH ?_graph {\
      ?m a mb:Model.\
      ?m a ?maintype.\
      ?m rdfs:label ?model_label.\
      ?mv mb:versieVan ?m.\
      ?mv mb:versiedatum ?datum.\
      ?mv mb:versienummer ?versie.\
      ?mv mb:status ?mvstatus\
      OPTIONAL {\
        ?mv mb:releaseDatum ?publicatiedatum.\
        ?mv mb:publicatieVan ?omv.\
        ?omv mb:versienummer ?publicatie_van\
      }\
    } GRAPH <urn:name:types> {\
      ?maintype rdfs:label ?type.\
      ?mvstatus rdfs:label ?status.\
    }\
  }\
  order by ?publicatiedatum DESC(?datum) LIMIT 100'
  );
  maak_history(queryParameters);
  return false;
}
