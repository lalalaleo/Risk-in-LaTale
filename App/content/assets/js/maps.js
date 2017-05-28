var map = {
    data:null,
    level:{
        "forest":{}
    },  
    get : function(mapName){
        this.data = data_map["forest"];
    },
    load:function(){
        var table_map = document.createElement("table");
        table_map.className = "map";
        table_map.id = "map";
        table_map.border = 0;
        $(".world").append(table_map);
        for(var i in this.data){
            var tr = document.createElement("tr");
            for(var j in this.data[i]){
                var td = document.createElement("td");
                switch(this.data[i][j]){
                    case " ":td.className=this.material.air.class;break;
                    case "x":td.className=this.material.grass.class;break;
                    case "o":td.className=this.material.ice.class;break;
                    case "|":td.className=this.material.rope.class;break;
                    default:break;
                }
                $(tr).append(td);
            }
            $("#map").append(tr);
        }
        
        layout.initMaterial();
    },
    material:{
        "grass":{
            class:"material grass",
        },
        "air":{
            class:"material air"
        },
        "rope":{
            class:"material rope"
        },
        "ice":{
            class:"material ice"
        }
    },
    getMaterial:function(site){
        var x = site.x + 1;
        var y = site.y + 1;
        var result=$("#map").children("tr:nth-last-child("+y+")").children("td:nth-child("+x+")").attr("class");
        return result.substring(9);
    }
}