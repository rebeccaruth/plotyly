function readFile(sample) {
    d3.json("samples.json").then((sample_data) => {
        var metadata = sample_data.metadata;
        var samples = sample_data.samples;
        var results = samples.filter(sampleObj => sampleObj.id == sample);
        var result = results[0]; 

        var otu_id = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_id.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];
        
        var layout = {
            title: "Top Ten Cultures",
            margain: {t: 50, l:100,}
        };

        Plotly.newPlot("bar", barData, layout);

    });

}

function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((sample_data)=>{
        var sample_names = sample_data.names;
        sample_names.foreach((sample)=>{
            selector 
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    var first_sample = sample_names[0];
    readFile(first_sample);
    });
}




