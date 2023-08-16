/* const endpoint = "https://fuseki.ont.belastingdienst.nl/modellenbibliotheek-ontw/sparql"; */
const endpoint = "https://fuseki.ont.belastingdienst.nl/modellenbibliotheek/sparql"; // Test René
if (typeof rdflib !== 'undefined') {
    rdflib.setEndpoint(endpoint);
}
const welkom = '<p>Modellenbibliotheek</p><div class="px-4 py-5 my-5 text-center"><h1 class="display-8 fw-bold">Modellenbibliotheek</h1><div class="col-lg-6 mx-auto"><img src="Modellenbibliotheek.png" width="400px"/><p class="lead mb-4">Vanaf deze pagina heeft u toegang tot de <br/><b>ONTWIKKEL</b> omgeving van de Modellenbibliotheek</p></div></div>';
const breadcrumb_title = 'MBieb-ontw';
