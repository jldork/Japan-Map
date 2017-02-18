import React, { Component } from 'react';
import { observer } from 'mobx-react'

import * as d3 from "d3";
import './Japan.css';

class Japan extends Component {
    constructor(props) {
        super(props)
        this.clicked = this.clicked.bind(this);
        this.draw = this.draw.bind(this);
        this.width = window.innerWidth*0.6;
        this.height = window.innerHeight;
    }
    componentDidMount() {
        this.draw()
    }
    clicked(feature, id) {
        let centered, x, y, k;
        if(feature){
            this.props.store.update_prefecture(feature['properties'])
        } else {
            this.props.store.update_prefecture(null)
        }
        

        if (feature && centered !== feature) {
            let centroid = this.path.centroid(feature);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = feature;
        } else {
            x = this.width / 2;
            y = this.height / 2;
            k = 1;
            centered = null;
        }

        // Set the clicked feature to .active class
        this.svg.selectAll("path")
            .classed("active", centered && function (d) {
                return d === centered;
            });


        this.features.transition()
            .duration(750)
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 1.5 / k + "px");

    }
    add_zoom_listener() {
        var zoom = d3.behavior.zoom()
            .scaleExtent([1, Infinity])
            .on("zoom", () => {
                this.features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
                    .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px");
            });

        this.svg.call(zoom);
    }
    draw() {
        const xy = this.props.store.coords
        let projection = d3.geoMercator()
            .scale(this.props.store.scale)
            .center([xy.longitude, xy.latitude]) //projection center
            .translate([this.width / 2, this.height / 2]) //translate to center the map in view
        this.path = d3.geoPath()
            .projection(projection);
        this.svg = d3.select("#map").append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
        this.svg.append("rect")
            .attr("class", "background")
            .attr("width", this.width)
            .attr("height", this.height)
            .on("click", this.clicked);
        this.features = this.svg.append("g")
            .attr("class", "features");

        d3.json("./prefecture.json", (error, geodata) => {

            if (error) { console.log(error) };
            // if (error) return console.log("ERROR: ",error); //unknown error, check the console
            //Create a path for each map feature in the data
            this.features.selectAll("path")
                .data(geodata['features'])
                .enter()
                .append("path")
                .attr("d", this.path)
                .on("click", this.clicked);
        });
    }
    render() {
        return <div id="map" />
    }
}



export default observer(Japan);
