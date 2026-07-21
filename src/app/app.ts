import { Component, HostListener, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Modelo para representar una tarea
interface Tarea{
  texto: string,
  completada: boolean
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  titulo = 'Gestor de Tareas Heliconius';

  nuevaTarea = ''; 

  estaOnline = navigator.onLine;

  // Dejamos el arreglo vacío inicialmente. Se llenará en cargarTareas()
  tareas : Tarea[] = [];
  
  ngOnInit(): void {
    console.log('[APP] Aplicacion iniciada');
    
    // 1. Cargamos las tareas desde el LocalStorage al iniciar
    this.cargarTareas();

    console.log('[APP] Estado inicial:', this.estaOnline ? 'Online' : 'Offline');

    //Verificamos si el navegador soporta serviceWorker 
    if('serviceWorker' in navigator){
      console.log('[APP] El navegador soporta Service Worker');

      //Inicializamos el service worker
      navigator.serviceWorker.ready.then((registro) => {
        console.log('[APP] Service Worker listo:', registro);
      });
    }else {
      console.warn('[APP] El navegador no soporta Service Worker');
    }
  }

  // --- NUEVAS FUNCIONES DE LOCALSTORAGE ---

  cargarTareas() {
    const tareasGuardadas = localStorage.getItem('misTareasPWA');
    if (tareasGuardadas) {
      // Si hay datos guardados, los convertimos de texto a nuestro arreglo
      this.tareas = JSON.parse(tareasGuardadas);
      console.log('[APP] Tareas cargadas desde LocalStorage');
    } else {
      // Si no hay nada (primera vez), ponemos tus tareas por defecto
      this.tareas = [
        { texto: 'Revisar manifest del PWA', completada: false },
        { texto: 'Revisar service worker', completada: false },
        { texto: 'Probar la aplicacion sin conexion', completada: false }
      ];
      this.guardarTareas(); 
    }
  }

  guardarTareas() {
    // Convierte el arreglo a texto y lo guarda en el navegador
    localStorage.setItem('misTareasPWA', JSON.stringify(this.tareas));
  }

  // ----------------------------------------

  //Se ejecuta cuando el navegador vuelve a tener conexión a internet
  @HostListener('window:online')
  cuandoVuelveInternet(){
    this.estaOnline = true;
    console.log('[APP] La aplicacion volvió a estar en linea');
  }

  //Se ejecuta cuando el navegador pierde conexión a internet
  @HostListener('window:offline')
  cuandoPierdeInternet(){
    this.estaOnline = false;
    console.log('[APP] La aplicacion quedó sin conexión a internet');
  }

  agregarTarea(){
    const textoLimpio = this.nuevaTarea.trim(); //trim quita espacios antes y despues del objeto
    if(textoLimpio.length == 0){
      console.warn('[APP] No se agrego la tarea porque está vacía');
      return;
    }

    this.tareas.push({
      texto: textoLimpio,
      completada: false
    });
    
    console.log('[APP] Tarea agregada: ', textoLimpio);

    this.nuevaTarea = '';
    
    // 2. Guardamos cambios al agregar
    this.guardarTareas();
  }

  cambiarEstado(tarea: Tarea){
    tarea.completada = !tarea.completada;
    console.log('[APP] Estado de la tarea cambiado: ', tarea);
    
    // 3. Guardamos cambios al completar/descompletar
    this.guardarTareas();
  }
  
  eliminarTarea(indice: number){
    const tareaEliminada = this.tareas[indice];
    this.tareas.splice(indice, 1);
    
    console.log('[APP] Tarea eliminada: ', tareaEliminada);
    
    // 4. Guardamos cambios al eliminar
    this.guardarTareas();
  }
}
