$(document).ready(function () {
  
    /**
     * Selectores de los elementos superiores e inferiores del overlap
     * estos elementos indican el inicio y fin del efecto.
     */
    const overlapUpElement = document.querySelector('.overlap-up-element');
    const overlapBottomElement = document.querySelector('.overlap-bottom-element');
    const overlapContainer = $('.overlap-container')

  
    /**
     * El primer hijo de la superposicion no contendra la clase .olvp-hidden"
     * que se encarga de ocultar los elementos hasta determinado momento dado de la posicion 
     * del scroll en panatalla, asi mismo el texto correspondiente a cada elemento
     * de la superposicion tampoco contrendra dicha clase y siempre será visible 
     * dentro del movimiento del scroll.
     */
    overlapContainer.children().not(':first-child, .overlap-child-text').each(() => {
      $(this).addClass('ovlp-hidden');

    });
  

    /**
     * El ultimo hijo del conjunto de superposiciones ("overlap-child") debe ser clonado,
     * esto con el objetivo de permitir que su texto correspondiente ("overlap-child-text")
     * pueda ser visible antes de que el efecto de superposición de paso a el comportamiento
     * normal de la pagina.
     */
    const overlapChild = $('.overlap-child');
    const lastOverlapChild = $('.overlap-child:last');

    if (lastOverlapChild) {
      const copyLastOverlapChild = lastOverlapChild.clone();
      copyLastOverlapChild.appendTo(overlapContainer);
    }
  
    if (overlapUpElement && overlapBottomElement && overlapChild && overlapContainer) {
  

    /**
     * Escuchando por el evento Scroll y a tavés del método .getBoundingClientRect() se evalua 
     * la posición de overlapUpElement (elemento superior del conjunto de superposiciones) 
     * overlapUpElement (elemento inferior del conjunto de superposiciones) 
     * cuando dicho elemento se encuentra en determinado punto de la pantalla se agregará o eliminará
     * la clase ".sticky" a todos los hijos de conjunto de superposiciones, lo cual mantendrá el conjunto
     * de superposiciones anclado en el centro de la pantalla mientras de realiza la accion de scroll.
     * 
     */
      $(window).scroll(function () {


        /**
         * En determinado punto de la pantalla y escuchando por el evento Scroll 
         * se determinará la posicion de overlapUpElement (elemento superior del conjunto 
         * de superposiciones) y en determinado punto e agregará la clase ".sticky" a todos 
         * los hijos del conjunto de la superposición esto detendrá el fluyo normal del scroll
         * y solo hará visibles los elementos de la superposición
         */
        if (overlapUpElement.getBoundingClientRect().bottom < 360) {
          overlapChild.addClass("sticky");
  
        }

        /**
         * Se determinará la posicion de overlapBottomElement (elemento inferior del conjunto 
         * de superposiciones) y en determinado punto se eliminará la clase ".sticky" a todos 
         * los hijos del conjunto de la superposición retomando el flujo normal del scroll en pantalla.
         */
        if (overlapBottomElement.getBoundingClientRect().top < 400) {
          overlapChild.removeClass("sticky");
        }



        /**
         * Por defecto todos los hijos del conjunto de la superposición no son visibles a excepcion
         * del primer hijo, a medida que cada hijo alcanza una posicion en pantalla este se hará visible
         * sobrelapando a su elemento hermano superior. Cuando el scroll de la pantalla va hacia abajo,
         * se hará, entonces, No visible de nuevo, dando visibilidad a su hermano inferior
         * cuando el scrol en pantalla va hacia arriba.
         */
        const overlapContainerHelper = document.querySelector('.overlap-container')
        const overlapChildren = overlapContainerHelper.children;

        let div;
        for (let i = 1; i < overlapChildren.length; i++) {
          div = overlapChildren[i]
          if (div.classList.contains('overlap-child')) {
            if (div.getBoundingClientRect().top <= 150) {
              div.classList.remove('ovlp-hidden')
              div.classList.add('ovlp-visible')
            } else {
              div.classList.add('ovlp-hidden')
              div.classList.remove('ovlp-visible')
            }
          }
        }
      });
    }

  
  });
  
  