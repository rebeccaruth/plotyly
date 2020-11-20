function readFile(sample) {
    d3.json("samples.json").then((sample_data) => {
        var metadata = sample_data.metadata;
        var samples = sample_data.samples;
        var results = samples.filter(sampleObj => sampleObj.id == sample);
        var result = results[0]; 

        var otu_id = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        //bar
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

        //bubble
        var trace1 = {
            x: otu_id,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
            color: otu_id,
            size: sample_values
            }
        };
        
        var data = [trace1];
        
        var layout = {
            height: 600,
            width: 600
        };
        
        Plotly.newPlot('bubble', data, layout);


    });

}

function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((sample_data)=>{
        var sample_names = sample_data.names;
        sample_names.forEach((sample)=>{
            selector 
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    var first_sample = sample_names[0];
    readFile(first_sample);
    demographics(first_sample);
    });
}

init();

function demographics(sample) {
    d3.json("samples.json").then((sample_data) => {
        var metadata = sample_data.metadata;
        console.log(metadata);
        var info = metadata.filter(sampleObj => sampleObj.id == sample)[0];
        console.log(info);
        var demo_info = d3.select("#sample-metadata") 
        demo_info.html("");
        Object.entries(info).forEach(([key, value]) => {
            demo_info.append("h5").text(`${key}: ${value}`);
        });
    });
}



function optionChanged(sample) {
    readFile(sample);
    demographics(sample);
  };