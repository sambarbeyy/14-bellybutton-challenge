
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


d3.json(url).then(function(data) {
  console.log(data);
});


function init() {

    // Use D3 for dropdown
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        
        
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        
        console.log(sample_one);

        
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);

    });
};


function buildMetadata(sample) {

    // get the data
    d3.json(url).then((data) => {

        // get the metadata
        let metadata = data.metadata;

        // filter based off of sample
        let value = metadata.filter(result => result.id == sample);

        
        console.log(value)

       
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        
        Object.entries(valueData).forEach(([key,value]) => {

            
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

function buildBarChart(sample) {

  
    d3.json(url).then((data) => {

       
        let sampleInfo = data.samples;

       
        let value = sampleInfo.filter(result => result.id == sample);

       
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

       
        console.log(otu_ids,otu_labels,sample_values);

        // Set top ten items to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
       // bar chart trace
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

       
        let layout = {
            title: "Top 10 OTUs Present"
        };

       
        Plotly.newPlot("bar", [trace], layout)
    });
};


function buildBubbleChart(sample) {

   
    d3.json(url).then((data) => {
        
        
        let sampleInfo = data.samples;

      
        let value = sampleInfo.filter(result => result.id == sample);

      
        let valueData = value[0];

      
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

      
        console.log(otu_ids,otu_labels,sample_values);
        
        
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

      
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        
        Plotly.newPlot("bubble", [trace1], layout)
    });
};


function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initialize function
init();


  
 