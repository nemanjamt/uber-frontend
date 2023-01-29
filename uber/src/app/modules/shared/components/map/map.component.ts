import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {icon, Marker} from 'leaflet';
import { debounceTime, fromEvent } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RideUtilCoordinatesService } from 'src/app/modules/ride/services/ride-util-coordinates.service';
import { MapService } from '../../services/map.service';
import { VehiclesMoveService } from '../../services/vehicles-move-service.service';
import { VehiclesService } from '../../services/vehicles.service';
import { MarkerInterface } from '../../types/marker.interface';
import { PositionAndSizeInterface } from '../../types/PositionAndSize.interface';
import { RouteInformation } from '../../types/RouteInformation';
import { RoutePartInterface } from '../../types/routePart.interface';
import { VehiclesInfoInterface } from '../../types/VehiclesInfo.interface';
import 'leaflet';
import 'leaflet-routing-machine';

declare const L: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public buttonsTexts: any[] = [];

  private map: any;

  private marker_list: MarkerInterface[] = [];

  private unregister_markers: Marker[] = [];

  private marker_list_counter = 0;

  private routing: any;

  private routing_array: any[] = [];

  private all_vehicles: VehiclesInfoInterface[] = [];

  public routesInformations : RouteInformation[] = [];
  
  public start_destination:string = "";

  @ViewChild('startInput', { static: false }) startInput!: ElementRef;

  @ViewChild('endInput', { static: false }) endInput!: ElementRef;
  public end_destination:string = "";

  @Input() styleObject! : PositionAndSizeInterface ;

  private unregister_user_counter_map = 0;

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

    this.initialize();
    this.resetMarker();
    // if(this.authService.isLoggedIn()){
      

    //   this.getAllVehicles();

    // }
  //  this.getAllVehicles();
    
    
    this.unregister_user_counter_map = 0;
  }

  public getAllVehicles() :void{

      this.vehiclesService.getAllVehicles().subscribe((vii: VehiclesInfoInterface[]) => {
        
        this.all_vehicles = vii;
        this.drawTaxiIcons();
        this.drawRoute();
      });

  }

  public  drawRoute() : void {
    for (let i = 0; i <this.all_vehicles.length; i++){
      let v = this.all_vehicles[i];
      if(v.route == null){//VOZILO PARKIRANO
        continue;
      }

      let one_route : RoutePartInterface[] = v.route.routeParts;

      for (var r of one_route){

        let start_marker =
            L.latLng(
              r.start.latitude,
              r.start.longitude

            );
        let end_marker =
            L.latLng(
              r.end.latitude,
              r.end.longitude

            );

        let newWaypoints:any[] = [];
         this.routing = L.Routing.control({
            waypoints: [
              start_marker,
              end_marker
            ],
            lineOptions: {
              styles: [{ color: "#965de9", weight: 5 }]
            }
        })

        .addTo(this.map);


          this.waitForRouteLoad(this.routing,r.index,start_marker,end_marker);

      }
    }
  }
  public float2int (value:number) {
      return value | 0;
  }

  public waitForRouteLoad(control: any  , index: number,start_marker:any, end_marker:any): void {

    if(index==0){
      control.hide();
      return
    }
   


    if(control._routes !== undefined){
     

     let marker = L.marker(
      [control._routes[index].coordinates[15].lat,control._routes[index].coordinates[15].lng], {
        title: 'My Marker',
        alt: 'Marker Description',
        icon: L.icon({
            iconUrl: 'assets/taxi-icons/van3.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        }),
       }
     );
   
     let num_ind = this.float2int(control._routes[index].coordinates.length/2);
    
     let newWaypoints = [start_marker,control._routes[index].coordinates[num_ind],end_marker];
    
    marker.addTo(this.map);

     control.setWaypoints(newWaypoints);
    
    control.hide();
    

    }
    else{
      setTimeout(() => {this.waitForRouteLoad(control,index,start_marker,end_marker)},250);
    }
  }

  public drawTaxiIcons() : void {
    for (let i = 0; i <this.all_vehicles.length; i++){

      let imageUlr = "assets/taxi-icons/";

      let v = this.all_vehicles[i];

      if(v.occupied){
        if(v.vehicleType==='STANDARD'){
          imageUlr += "taxi1.png";
        }
        else if(v.vehicleType==='LUXURIOUS'){
          imageUlr += "taxi3.png";
        }
        else{
          imageUlr += "van3.png";
        }
      }
      else{
        if(v.vehicleType==='STANDARD'){
          imageUlr += "open3.png";
        }
        else if(v.vehicleType==='LUXURIOUS'){
          imageUlr += "open3.png";
        }
        else{
          imageUlr += "vanopen2.png";
        }
      }



      let taxiIcon = L.icon({
        iconUrl: imageUlr,
        iconSize: [40, 40]
      })

      var marker = L.marker([v.location.latitude, v.location.longitude], { icon: taxiIcon }).addTo(this.map);

      v.marker = marker;

    }
  }

  initialize() {
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
  }

  ngAfterViewInit(): void {

    this.initMap();
    fromEvent(this.startInput.nativeElement, 'input')
      .pipe(debounceTime(1200)) // 1 sekunda debounce vremena
      .subscribe(() => {
        this.onStartDestinationChange(this.start_destination);
      });

      fromEvent(this.endInput.nativeElement, 'input')
      .pipe(debounceTime(1200)) // 1 sekunda debounce vremena
      .subscribe(() => {
        this.onEndDestinationChange(this.end_destination);
      });

  }

  public reset_params(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);

  }
  private initMap(): void {

    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 11
    });

    console.log("MAPAA");
    console.log(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('click', (e: any) => {
      ++this.unregister_user_counter_map;

      if (!this.authService.isLoggedIn() && this.unregister_user_counter_map == 3 || this.marker_list.length >= 2) {
        --this.unregister_user_counter_map;
        return;
      }

      if(this.unregister_user_counter_map == 1){
        //dobavi adresu i stavi u pocetnu destinaciju
      }
      else{
        //dobavi adresu i stavi u krajnju destinaciju
      }


      var self = this;

      var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(self.map);
      
      this.unregister_markers = [...this.unregister_markers, newMarker];
      
      this.mapService.reverseSearch(e.latlng.lat, e.latlng.lng).subscribe( res => {
        


        if(this.unregister_user_counter_map == 1){
          this.start_destination = res.display_name;
        }
        else{
          this.end_destination = res.display_name;
        }
      });
      this.marker_list = [...this.marker_list, { 'longitude': e.latlng.lng, 'latitude': e.latlng.lat }];


    });

  }

  public onStartDestinationChange(e:any){
    this.start_destination = e;

    this.mapService.search(this.start_destination).subscribe(res =>{
      if(!res[0])
        return;
      
      let lat = res[0].boundingbox[1];
      let lang = res[0].boundingbox[3];

      var newMarker = L.marker([lat,lang]).addTo(this.map);
      this.marker_list = [...this.marker_list, { 'longitude': lang, 'latitude': lat }];
      if(this.unregister_markers.length > 0){
        this.unregister_markers[0].remove();
        this.unregister_markers[0] = newMarker;
      }else{

        this.unregister_markers = [...this.unregister_markers, newMarker];
      }
      
      
    },
    error =>{
    });
    
    
  }

  public onEndDestinationChange(e:any){
    this.end_destination = e;
    
    // this.unregister_markers.splice(1,0, newMarker);
    this.mapService.search(this.end_destination).subscribe(res =>{
      if(!res[0])
        return;
      
      let lat = res[0].boundingbox[1];
      let lang = res[0].boundingbox[3];

      var newMarker = L.marker([lat,lang]).addTo(this.map);
      this.marker_list = [...this.marker_list, { 'longitude': lang, 'latitude': lat }];
      if(this.unregister_markers.length > 1){
        this.unregister_markers[1].remove();
        this.unregister_markers[1] = newMarker;
        
      }else{

        this.unregister_markers.splice(1,0, newMarker);
      }
      
    },
    error =>{
  
    });
    
    
  
  }

   public create_route(){

    if (this.marker_list.length <= 1 || this.unregister_markers.length <= 1) {

      return;
    }
    let start_marker = this.unregister_markers[0].getLatLng();

    let end_marker =this.unregister_markers[1].getLatLng();

      // L.latLng(
      //   this.unregister_markers[1]._latlng.lat,
      //   this.unregister_markers[1]['longitude']
      // );
      
    if(this.routing){
      this.routing.remove();
    }
    this.routing = L.Routing.control({
      waypoints: [
        start_marker,
        end_marker
      ],
      alternatives:true,
      showAlternatives:true,
      alternativeCount:3,
      draggableWaypoints: false,
      altLineOptions: {
        styles: [
          {color: 'black', opacity: 0.15, weight: 6},
          {color: 'green', opacity: 0.8, weight: 3},
          {color: 'blue', opacity: 0.5, weight: 2}
        ]
      }
    }).on('routesfound',(e:any)=>{

      var routes = e.routes;
      this.routesInformations = [];
      for (let i = 0; i < routes.length; i++) {

        var route = routes[i];

        let roads:string[] = []
        
        for(let instruction of route.instructions){
          if(!roads.includes(instruction.road) && instruction.road.length > 1){
            roads.push(instruction.road);
          }
        }
       
        let routeInformation: RouteInformation = {distance:this.convert_distance(route.summary.totalDistance), streets:this.create_streets(roads), time:this.convert_time(route.summary.totalTime), money:this.convert_money(route.summary.totalDistance)};
        this.routesInformations.push(routeInformation);
       
      }
      console.log("ROUTES");
      console.log(routes);
      this.routing._container.style.display = "None";
    })
      
      .addTo(this.map);
    this.routing_array = [... this.routing_array, this.routing];

    this.buttonsTexts = [...this.buttonsTexts, { text: `button ${this.marker_list_counter}`, isHide: true }];
    
    
    

  }

  private create_streets(streets:string[]):string{
    return streets.join('-');
  }

  public resetMarker(): void {
    this.marker_list_counter = 0;
    
  }

  public find_route() {
    if (this.marker_list_counter === (this.marker_list.length - 1)) {

      return;
    }

    let start_marker =
      L.latLng(
        this.marker_list[this.marker_list_counter]['latitude'],
        this.marker_list[this.marker_list_counter]['longitude']
      );
    let end_marker =
      L.latLng(
        this.marker_list[this.marker_list_counter + 1]['latitude'],
        this.marker_list[this.marker_list_counter + 1]['longitude']
      );

    this.routing = L.Routing.control({
      waypoints: [
        start_marker,
        end_marker
      ]
    })

      .on('routeselected', (e: any) => {
        if (this.marker_list_counter === (this.marker_list.length - 1)) {

          return;
        }
        var route = e.route;
        

        
        let taxiIcon = L.icon({
          iconUrl: 'assets/car_1.png',
          iconSize: [40, 40]
        })

        var marker = L.marker([route.coordinates[0].lat, route.coordinates[1].lng], { icon: taxiIcon }).addTo(this.map);

        route.coordinates.forEach(function (coord:any, index:any) {
              setTimeout(function () {
                  marker.setLatLng([coord.lat, coord.lng]);
              }, 100 * index)
          });

      })
      .addTo(this.map);
    this.routing_array = [... this.routing_array, this.routing];

    this.buttonsTexts = [...this.buttonsTexts, { text: `button ${this.marker_list_counter}`, isHide: true }];

  }

  public get_markers(start:MarkerInterface , end:MarkerInterface, route_index:number) : MarkerInterface[] {

    let list_coordinates: MarkerInterface[] =[];

    let start_marker =
      L.latLng(
        start.latitude,
        start.longitude
      );
    let end_marker =
      L.latLng(
        end.latitude,
        end.longitude
      );

    this.routing = L.Routing.control({
      waypoints: [
        start_marker,
        end_marker
      ]
    })
    .on('routesfound', function (e: any) {

        var routes = e.routes;


        e.routes[route_index].coordinates.forEach(function (coord:any, index:any) {
          list_coordinates = [...list_coordinates , {longitude:coord.longitude, latitude:coord.latitude}];
        });

      })
      return list_coordinates;

  }

  public toggleLegend(index: number): void {
    // alert('clicked');


    let elem = this.buttonsTexts[index];

    if (elem['isHide'] === false) {
      this.routing_array[index].hide();
      elem['isHide'] = true;
    }
    else {
      this.routing_array[index].show();
      elem['isHide'] = false;
    }

    // this.routing_array[index].hide();
  }

  public remove_layer(): void {
    this.routing_array[0].hide();
    // this.routing.hide();
  }
  public show_layer(): void {
    this.routing_array[0].show();
    // this.routing.show();
  }

  public next_route(): void {
    // this.next_selected_route = false;
    this.marker_list_counter += 1;
    this.routing.hide();
    this.find_route();
  }

  // function convertSeconds(seconds) {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   return `${hours} hours ${minutes} minutes`;
  // }
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

  private convert_money(distance:number):string{
    const money = distance*120/1000;
    const rounded = parseFloat(money.toFixed(0));
    return `${rounded} RSD`;
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

  addMarketToMap(marker: any) {
    var marker = L
      .marker([marker['longitude'], marker['latitude']])
      .addTo(this.map)
      .bindPopup('Dodao si novi marker burazzzz!');;
  }


}
