import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'leaflet';
import { icon, Marker } from 'leaflet';
import 'leaflet-routing-machine';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MapService } from 'src/app/modules/shared/services/map.service';
import { VehiclesMoveService } from 'src/app/modules/shared/services/vehicles-move-service.service';
import { VehiclesService } from 'src/app/modules/shared/services/vehicles.service';
import { RideUtilCoordinatesService } from '../../services/ride-util-coordinates.service';
import { Coordinates } from '../../types/Coordinates';
import * as L2 from 'leaflet';



declare const L: any;
@Component({
  selector: 'app-ride-history-map',
  templateUrl: './ride-history-map.component.html',
  styleUrls: ['./ride-history-map.component.scss']
})
export class RideHistoryMapComponent implements OnInit {

  public buttonsTexts: any[] = [];

  private map: any;

  

  private routing: any;

  
  @Input()
  coordinates:Coordinates[] = [] ;

  

  

  constructor(
    public rucs: RideUtilCoordinatesService,

    private vehiclesService:VehiclesService,
    private vehicle_move :VehiclesMoveService,
    private authService:AuthService,
    private mapService:MapService,
    private router: Router
  ) {



  }

  ngOnInit(): void {
   
  }

  

  
  

  

  

  

  ngAfterViewInit(): void {

    
    const map2 = L2.map('map233', {
          center: [45.2396, 19.8227],
          zoom: 11
        }
        );

    L2.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(map2);

    
    let markers = [];
    let i = 0;
    const iconRetinaUrl = 'assets/marker-icon.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = undefined;

    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;

    for(let c of this.coordinates){
      let m;

      if(i == 0 || i == 2){
         m =  L.marker([c.latitude,c.longitude]).addTo(map2);
        //  assets/marker-icon.png
      }else{
         m = L.marker([c.latitude,c.longitude]);
         
      }
      
      markers.push(m.getLatLng());
      ++ i;
    }
    

    this.routing = L.Routing.control({
      waypoints: markers,
      createMarker: function() { return null; },
      draggable: false
    }).on('routesfound',(e:any)=>{
      this.routing._container.style.display = "None";
    })
      
      .addTo(map2);

  }

 
  
  private convert_distance(distance:number):string{
    if(distance < 100){
      return `${distance} m`;
    }
    distance = Math.trunc(distance);//12.34 -> 12
    // rounded = num.toFixed(2);
    const distance_km = distance/1000;
    if(distance % 100 !== 0){
      const rounded_distance = parseFloat(distance_km.toFixed(2));
      return `${rounded_distance} km`;
    }
  
    return `${distance_km} km`;
  }

  private convert_time(time:number):string{
    if(time < 60){
      return `${time} seconds`;
    }
    let min = Math.trunc(time/60);
    if(min < 60){
      return `${min} minutes ${Math.trunc(time%60)} seconds`;
    }

    let hours = Math.trunc(time/3600);
    return `${hours} hours ${Math.trunc((time-3600*hours)/60)} minutes`;


  }


}
