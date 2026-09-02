import { Level } from './types';

export const KINEMATICS_LEVELS: Level[] = [
  {
    id: 1,
    title: "1. El Despegue del Extrover-1",
    conceptTitle: "Movimiento Rectilíneo Uniforme (M.R.U.)",
    narrative: "Los Extrovers —Brayan, Michell y Alisson— se preparan para despegar en su nave estelar, el Extrover-1. Para cruzar de manera segura el anillo exterior sin alertar a los radares de basura espacial, deben estabilizar la velocidad del reactor principal para que la nave se desplace sin acelerar, viajando exactamente en línea recta.",
    concepts: [
      "Fórmula clave: d = v • t (donde d es distancia, v es velocidad y t es tiempo)",
      "Velocidad constante: Significa que la rapidez y la dirección no cambian en el tiempo.",
      "Aceleración nula (a = 0): No existen variaciones en el vector velocidad en un M.R.U.",
      "En las pruebas Saber 11, el M.R.U. se reconoce porque el móvil recorre distancias iguales en tiempos iguales."
    ],
    prediction: {
      question: "Si la sonda de navegación mide que el Extrover-1 avanza en línea recta con M.R.U. a una rapidez constante de 20 m/s durante 10 segundos enteros, ¿qué ocurrirá con el valor de su aceleración?",
      options: [
        "A) La aceleración aumenta a razón de 2 m/s².",
        "B) La aceleración se mantiene fija en 0 m/s².",
        "C) La aceleración será de 200 m/s².",
        "D) La aceleración se duplica cada segundo."
      ],
      explanation: {
        "A": "Incorrecto. Si la velocidad no cambia, no hay incremento de velocidad; por lo tanto, la aceleración no puede aumentar.",
        "B": "¡Excelente deducción! Al tratarse de un M.R.U., la velocidad permanece completamente constante, lo que se traduce físicamente en una aceleración igual a cero.",
        "C": "Incorrecto. 200 metros es la distancia recorrida (d = v • t = 20 * 10), no el valor de la aceleración.",
        "D": "Incorrecto. Si la aceleración cambiara, pasaríamos a un movimiento acelerado (M.R.U.A.), dejando de ser constante la velocidad."
      }
    },
    saber11: {
      context: "El Extrover-1 recorre el sector Alfa sosteniendo una velocidad horizontal constante de 72 km/h en línea recta hacia el este. El computador de a bordo registra la posición de la nave a intervalos ordenados de tiempo para verificar la estabilidad.",
      questionText: "De acuerdo con los estándares de la prueba Saber 11, ¿cuál de las siguientes gráficas de posición (x) en función del tiempo (t) representa adecuadamente el comportamiento del Extrover-1 en este trayecto?",
      options: [
        { key: "A", text: "Una curva parabólica ascendente que se eleva abruptamente hacia el infinito, debido a que la rapidez acumula energía cinética." },
        { key: "B", text: "Una línea recta horizontal paralela al eje del tiempo, indicando que el espacio ocupado por el Extrover-1 no tiene cambios." },
        { key: "C", text: "Una línea diagonal recta con pendiente positiva y constante que pasa por el origen de coordenadas, pues recorre distancias iguales en tiempos iguales." },
        { key: "D", text: "Una línea recta vertical perpendicular al eje del tiempo, indicando velocidad infinita en un solo instante." }
      ],
      correctAnswer: "C",
      pedagogicalFeedback: "Para un Movimiento Rectilíneo Uniforme (M.R.U.), la ecuación de posición en función del tiempo es x(t) = xi + v•t, la cual corresponde matemáticamente a una función lineal de primer grado. Gráficamente, una función lineal se dibuja como una línea recta diagonal con una pendiente constante que representa justamente la velocidad (en este caso 72 km/h = 20 m/s). La línea recta horizontal representaría reposo (velocidad cero) y la parábola correspondería a un movimiento acelerado (M.R.U.A.). Por lo tanto, la respuesta correcta es la C."
    },
    xpReward: 50,
    coinsReward: 10
  },
  {
    id: 2,
    title: "2. Frenado de Emergencia en el Abismo",
    conceptTitle: "Movimiento Rectilíneo Uniformemente Acelerado (M.R.U.A.)",
    narrative: "De pronto, Michell detecta en el radar holográfico una gigantesca barrera de asteroides que bloquea el carril interestelar. Alisson presiona el timón y activa inmediatamente los frenos de plasma inverso para detener el Extrover-1 de forma rápida y constante, evitando una colisión inminente.",
    concepts: [
      "Aceleración constante: Significa que la velocidad experimenta variaciones iguales en tiempos iguales.",
      "Desaceleración o Frenado: Ocurre cuando el vector aceleración tiene sentido opuesto al vector velocidad, reduciendo la rapidez.",
      "Ecuaciones principales: vf = vi + a • t  |  d = vi • t + 0.5 • a • t²",
      "Para las Saber 11 es vital notar que el signo de la aceleración define si el móvil gana o pierde velocidad respecto a su sentido."
    ],
    prediction: {
      question: "Si la rapidez del Extrover-1 está disminuyendo para frenar, ¿hacia dónde apunta el vector de aceleración en relación con la marcha de la nave?",
      options: [
        "A) Apunta en el mismo sentido del movimiento para empujar la parada.",
        "B) Apunta en sentido contrario a la dirección de la velocidad del móvil.",
        "C) No posee dirección puesto que el vehículo se está deteniendo.",
        "D) Gira formando círculos en torno a la cabina."
      ],
      explanation: {
        "A": "Incorrecto. Si apuntara en el mismo sentido, la velocidad de la nave aumentaría en vez de disminuir.",
        "B": "¡Correcto! Cuando la velocidad disminuye, el vector aceleración actúa como una fuerza de resistencia orientada en sentido contrario al movimiento, disminuyendo progresivamente la rapidez.",
        "C": "Incorrecto. Todo cambio de velocidad posee un vector aceleración bien definido.",
        "D": "Incorrecto. Al ser movimiento rectilíneo, las direcciones están restringidas a la línea recta del avance."
      }
    },
    saber11: {
      context: "El Extrover-1 viaja en línea recta a una velocidad de 30 m/s. Al avistar el obstáculo, el piloto activa los motores inversos y logra detener la nave por completo en exactamente 6 segundos.",
      questionText: "¿Cuál es la magnitud de la aceleración experimentada por la nave y su dirección respecto al movimiento original durante el frenado?",
      options: [
        { key: "A", text: "5 m/s² en la misma dirección de la marcha, porque frena con fuerza constante en esa dirección." },
        { key: "B", text: "5 m/s² en dirección contraria a la de la marcha, puesto que la velocidad disminuye uniformemente." },
        { key: "C", text: "180 m/s² en dirección opuesta al recorrido cósmico de la nave." },
        { key: "D", text: "0 m/s² ya que se detiene por completo al final del intervalo de 6 segundos." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "Calculamos la aceleración usando la fórmula vf = vi + a • t. Dado que la nave frena por completo, su velocidad final es vf = 0 m/s. Sustituyendo los valores: 0 = 30 + a • 6. Esto nos da 6 • a = -30, por lo que a = -5 m/s². El valor absoluto o magnitud de la aceleración es de 5 m/s², y el signo negativo físicamente expresa que actúa en dirección opuesta al movimiento de la nave, amortiguando la rapidez. Esto se explica correctamente en la opción B."
    },
    xpReward: 60,
    coinsReward: 15
  },
  {
    id: 3,
    title: "3. Descifrando el Panel Galáctico",
    conceptTitle: "Análisis de Gráficas de Posición vs. Tiempo (x - t)",
    narrative: "Para avanzar más allá del cinturón de asteroides, Michell debe hackear la terminal del Portal Centauro. El descifrado requiere interpretar las señales de una boya que emite gráficas holográficas de posición contra tiempo. El grupo debe deducir en qué estado físico se halla la boya observando el panel.",
    concepts: [
      "Gráfica x vs t: La pendiente de la recta representa la velocidad del cuerpo.",
      "Pendiente positiva: El cuerpo se aleja del origen (velocidad positiva).",
      "Pendiente negativa: El cuerpo regresa hacia el origen (velocidad negativa).",
      "Línea horizontal: Posición invariable. Equivale a reposo absoluto (velocidad = 0)."
    ],
    prediction: {
      question: "Si el holograma muestra un tramo completamente horizontal en la gráfica de Posición (x) vs Tiempo (t), ¿qué indica sobre el movimiento de la boya interestelar?",
      options: [
        "A) Que la boya se desplaza a una rapidez constante muy elevada.",
        "B) Que la boya se encuentra completamente inmóvil (en reposo).",
        "C) Que la boya está acelerando uniformemente en espiral.",
        "D) Que la gravedad aumentó e hizo colapsar el sensor."
      ],
      explanation: {
        "A": "Incorrecto. Si se desplazara a velocidad constante, la gráfica mostraría una diagonal con inclinación, no una línea plana horizontal.",
        "B": "¡Grandioso! Al mantener la misma posición 'x' a lo largo del tiempo 't', no hay movimiento. La velocidad es cero, confirmando el estado de reposo.",
        "C": "Incorrecto. La aceleración uniforme en x-t se vería como una curva parabólica.",
        "D": "Incorrecto. Se trata de un comportamiento cinemático estándar fácil de interpretar sin necesidad de colapso de sensores."
      }
    },
    saber11: {
      context: "La gráfica de telemetría de una sonda de exploración consta de tres partes secuenciales en un plano de posición (x) contra tiempo (t):\n- Intervalo 1 (0 a 3 min): Línea recta diagonal ascendente.\n- Intervalo 2 (3 a 8 min): Línea horizontal paralela al eje t.\n- Intervalo 3 (8 a 10 min): Línea recta diagonal descendente que finaliza en x = 0.",
      questionText: "¿Cuál de las siguientes afirmaciones describe de forma físicamente correcta la trayectoria total de la sonda?",
      options: [
        { key: "A", text: "La sonda acelera uniformemente en el Intervalo 1, mantiene rapidez alta en el Intervalo 2 y desacelera para pararse en el Intervalo 3." },
        { key: "B", text: "En el Intervalo 2 la sonda permaneció estacionaria (reposo), y en el Intervalo 3 retrocedió con velocidad constante de vuelta al origen." },
        { key: "C", text: "La velocidad en todo el viaje fue constante y siempre en el mismo sentido." },
        { key: "D", text: "La distancia total recorrida es cero porque la sonda llegó al mismo lugar donde empezó." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "Analicemos las pendientes de cada intervalo de la gráfica x-t: En el Intervalo 1, la pendiente es positiva y constante, indicando velocidad constante positiva (alejándose del origen). En el Intervalo 2, la pendiente es cero (línea horizontal), indicando reposo (posición constante). En el Intervalo 3, la pendiente es negativa y constante, lo que significa velocidad constante negativa, es decir, el robot regresa al punto inicial de partida. Notemos que la distancia total NO es cero (recorrió camino de ida y vuelta), lo que se hace cero al regresar es el desplazamiento neto. Así, la opción correcta es la B."
    },
    xpReward: 70,
    coinsReward: 15
  },
  {
    id: 4,
    title: "4. Evasión de Drones Centinela",
    conceptTitle: "Análisis de Gráficas de Velocidad vs. Tiempo (v - t)",
    narrative: "Tres drones de seguridad del Portal se han activado y persiguen de cerca a Brayan, Michell y Alisson. Para evadirlos en el hipersector, el mapa táctico muestra gráficos de velocidad (v) vs. tiempo (t) de los drones para calcular el momento ideal en que se agotará su combustible auxiliar mediante el área bajo la curva.",
    concepts: [
      "Gráfica v vs t: La pendiente de la curva representa la aceleración del cuerpo.",
      "Área bajo la curva: En un gráfico de velocidad vs. tiempo, el área geométrica encerrada corresponde exactamente a la distancia recorrida (desplazamiento).",
      "Diferenciación: No confundas x-t con v-t, son lecturas muy diferentes."
    ],
    prediction: {
      question: "Si el área bajo la curva en una gráfica v vs t mide la distancia, ¿qué figura geométrica se formará si un dron se mueve con velocidad constante?",
      options: [
        "A) Un círculo perfecto.",
        "B) Un rectángulo o cuadrado bajo la línea horizontal.",
        "C) Un triángulo que inicia en el origen.",
        "D) Una parábola cóncava."
      ],
      explanation: {
        "A": "Incorrecto. Los ejes tiempo y velocidad avanzan de forma lineal e independiente, un círculo no modela velocidad constante continua.",
        "B": "¡Correcto! Al ser la velocidad constante, se dibuja como una línea horizontal continua. El área bajo esta línea desde t1 hasta t2 forma un rectángulo cuya área es igual a base (tiempo) por altura (velocidad).",
        "C": "Incorrecto. Un triángulo surgiría de una velocidad que cambia uniformemente desde cero (sección lineal inclinada).",
        "D": "Incorrecto. La parábola es para posición en movimiento acelerado."
      }
    },
    saber11: {
      context: "El Dron Guardián Alpha inicia desde el reposo en t=0 s y acelera con aceleración constante hasta llegar a una velocidad de 20 m/s en t=10 s (línea inclinada). Al mismo tiempo, el Dron Centinela Beta viaja frente a él sosteniendo una velocidad horizontal constante de 10 m/s durante esos mismos 10 segundos.",
      questionText: "Sabiendo que ambos drones iniciaron desde la misma línea de salida al mismo tiempo, ¿cuál de ellos habrá recorrido mayor distancia física después de transcurridos los 10 segundos?",
      options: [
        { key: "A", text: "El Dron Centinela Beta, porque su velocidad inicial era superior a la de Alpha." },
        { key: "B", text: "El Dron Guardián Alpha, ya que logró alcanzar una velocidad final mucho mayor (20 m/s)." },
        { key: "C", text: "Ambos drones recorrieron exactamente la misma distancia de 100 metros en ese lapso de tiempo." },
        { key: "D", text: "El Dron Alpha recorre 200 metros mientras que el Dron Beta recorre 100 metros." }
      ],
      correctAnswer: "C",
      pedagogicalFeedback: "Calculamos el área bajo la curva v-t para cada dron de 0 a 10s. Para Beta (velocidad constante de 10 m/s), la forma es un rectángulo de base 10 s y altura 10 m/s, dando un área (distancia) = 10s • 10 m/s = 100 m. Para Alpha (aceleración constante desde 0 hasta 20 m/s), la forma es un triángulo rectángulo de base 10 s y altura 20 m/s, dando un área = (base • altura) / 2 = (10s • 20 m/s) / 2 = 100 m. Sorprendentemente, ambos drones cubrieron la misma distancia de 100 metros, lo cual es la opción C."
    },
    xpReward: 80,
    coinsReward: 20
  },
  {
    id: 5,
    title: "5. La Trampa de Gravedad del Asteroide",
    conceptTitle: "Caída Libre y Leyes de la Gravedad en el Vacío",
    narrative: "Los Extrovers necesitan depositar un contenedor purificador en la superficie del asteroide inerte 'Epsy-9'. Debido a que el asteroide tiene una atmósfera inexistente, Alisson propone dejar caer el contenedor desde la órbita de atraque en caída libre pura. Deben comprobar cómo afectará la gravedad a la velocidad de caída de cuerpos de distinta masa.",
    concepts: [
      "Caída libre: Es un caso de M.R.U.A. en el eje vertical, donde la aceleración es producida únicamente por la gravedad local.",
      "Independencia de la masa: Al no existir resistencia del aire (vacío), todos los cuerpos en un mismo punto de gravedad caen con la misma aceleración, sin importar su masa.",
      "Fórmula de caída: h = 0.5 • g • t² | vf = g • t"
    ],
    prediction: {
      question: "Si en el vacío del asteroide dejamos caer un yunque de hierro de 100 kg y una diminuta tuerca de repuesto de 1 g al mismo tiempo desde una plataforma, ¿cuál impactará el suelo primero?",
      options: [
        "A) El yunque, por ser más masivo y atraído con mayor fuerza neta de gravedad.",
        "B) La tuerca, porque al tener menos masa experimenta menor inercia.",
        "C) Llegarán al suelo exactamente al mismo tiempo.",
        "D) Quedarán flotando sin caer porque están en el espacio exterior."
      ],
      explanation: {
        "A": "Incorrecto. Aunque la fuerza es mayor en el yunque, su inercia también lo es en idéntica proporción, lo que anula la diferencia de masa en la aceleración.",
        "B": "Incorrecto. La inercia menor no le da ventaja en la velocidad de caída, la aceleración gravitacional es idéntica.",
        "C": "¡Impecable! Al no existir aire, no hay fuerza de oposición aerodinámica. La aceleración gravitacional depende solo de la gravedad del asteroide, por lo que ambos aceleran igual y tocan el suelo juntos.",
        "D": "Incorrecto. El asteroide posee una masa específica y por ende una aceleración de la gravedad activa que tira de los cuerpos cercanos."
      }
    },
    saber11: {
      context: "En un experimento evaluativo, un estudiante suelta una bola de plomo y una pluma de ave en una cámara especial de aire sellada de la cual se ha extraído totalmente el aire (generando vacío absoluto). La gravedad interior está calibrada a g = 10 m/s² y la altura de caída es de 20 metros.",
      questionText: "¿Cuál de las siguientes es una conclusión científicamente válida dentro de la física Saber 11 para catalogar el tiempo de caída de ambos objetos?",
      options: [
        { key: "A", text: "La bola de plomo toca el suelo en un tiempo menor porque la fuerza de atracción gravitatoria es proporcional a su masa." },
        { key: "B", text: "Ambos tocan el suelo simultáneamente en exactamente 2 segundos, ya que la aceleración es independiente de la masa al no haber resistencia del aire." },
        { key: "C", text: "La pluma llegará antes porque tiene menor superficie de contacto y menos rozamiento cuántico." },
        { key: "D", text: "La bola de plomo demora 4 segundos mientras la pluma tarda 40 segundos producto del equilibrio inercial." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "La distancia para caída libre desde el reposo se rige por h = 1/2 • g • t². Al despejar el tiempo, obtenemos t = √(2h / g). Sustituyendo la altura de 20 m y g = 10 m/s², se tiene t = √(40 / 10) = √4 = 2 segundos. Como se encuentra en cámara de vacío, la masa no altera la aceleración g, por lo que ambos objetos caen en idéntico intervalo de tiempo. Así, la opción correcta es la B."
    },
    xpReward: 90,
    coinsReward: 20
  },
  {
    id: 6,
    title: "6. Lanzamiento Vertical al Enclave Orbital",
    conceptTitle: "Lanzamiento Vertical Hacia Arriba",
    narrative: "Para activar los generadores acoplados a un satélite de comunicaciones que orbita justo encima, Michell debe eyectar un cartucho electromagnético con un tiro perfectamente vertical. Si la velocidad inicial de lanzamiento no es correcta, el cartucho podría quedarse corto o rebasar el satélite antes de que las compuertas se abran.",
    concepts: [
      "Velocidad en altura máxima (vf = 0): Cuando el objeto alcanza el punto más alto, su velocidad instantánea es momentáneamente cero.",
      "Aceleración constante: La gravedad de -10 m/s² nunca desaparece en la trayectoria; frena al subir y acelera al bajar.",
      "Simetría temporal: El tiempo que el objeto tarda en subir es idéntico al tiempo que le toma regresar al origen de tiro."
    ],
    prediction: {
      question: "Cuando el cartucho electromagnético alcanza su punto de altura máxima en el cielo antes de empezar a descender, ¿cuánto valen su velocidad y su aceleración?",
      options: [
        "A) Velocidad máxima y aceleración cero.",
        "B) Velocidad cero y aceleración igual al valor de la gravedad local.",
        "C) Velocidad cero y aceleración cero.",
        "D) Velocidad y aceleración en valores indeterminados."
      ],
      explanation: {
        "A": "Incorrecto. Al detenerse temporalmente para cambiar de sentido, la velocidad no puede ser máxima.",
        "B": "¡Excelente! En la cúspide la velocidad se hace momentáneamente cero. Sin embargo, la aceleración de la gravedad sigue atrayendo el cuerpo hacia abajo (si la gravedad fuera cero, el objeto flotaría ahí arriba para siempre).",
        "C": "Incorrecto. Si la aceleración fuera cero, el móvil no cambiaría su velocidad para regresar al suelo.",
        "D": "Incorrecto. Ambas variables físicas son medibles e infinitamente precisas."
      }
    },
    saber11: {
      context: "El dispositivo extruido de Los Extrovers eyecta el cartucho verticalmente hacia arriba con una velocidad de salida de 30 m/s. Se desprecia todo rozamiento viscoso con el aire y se asume una aceleración de la gravedad g = 10 m/s².",
      questionText: "¿Cuál es la altura máxima que logrará alcanzar el cartucho y de cuánto tiempo dispone el hangar para atraparlo mientras sube?",
      options: [
        { key: "A", text: "Alcanza de forma exacta 45 metros de altura en un tiempo de subida de 3 segundos." },
        { key: "B", text: "Consigue 90 metros de altura sosteniendo el vuelo durante 6 segundos." },
        { key: "C", text: "Logra trepar 30 metros de altura en un lapso de 3 segundos antes del colapso." },
        { key: "D", text: "Sube hasta 45 metros empleando apenas 1.5 segundos debido al empuje inicial." }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "Primero calculamos el tiempo de subida t_sub utilizando vf = vi - g • t (usamos signo negativo de gravedad porque va hacia arriba, oponiéndose a vi). Sustituyendo vf = 0 y vi = 30 m/s: 0 = 30 - 10 • t => t_sub = 3 segundos. Luego, determinamos la altura máxima alcanzada h_max = vi • t - 0.5 • g • t² = 30 • (3) - 0.5 • 10 • (3)² = 90 - 45 = 45 metros. Esto ratifica que la nave captura el dispositivo al cabo de 3 segundos de subida a los 45 metros, correspondiente con la opción A."
    },
    xpReward: 100,
    coinsReward: 25
  }
];

export const DYNAMICS_LEVELS: Level[] = [
  {
    id: 11,
    title: "11. La Inercia del Guerrero",
    conceptTitle: "Primera Ley de Newton (Inercia)",
    narrative: "¡Saludos, recluta! Nova te da la bienvenida al campo de entrenamiento dinámico. Aquí descifraremos las leyes de las fuerzas del universo. En nuestro primer desafío, analizaremos el comportamiento de un cuerpo inmerso en un medio fluido. Nova te pregunta: ¿cómo cambia la aceleración cuando las fuerzas se equilibran?",
    concepts: [
      "Diagrama de Cuerpo Libre (DCL): Representación gráfica de todas las fuerzas externas que actúan sobre un cuerpo.",
      "Fuerza de Resistencia del Agua: Fuerza viscosa que se opone a la dirección del movimiento de un cuerpo y aumenta con la rapidez.",
      "Fuerza Neta Nula (∑F = 0): Cuando las fuerzas opuestas se igualan, la fuerza neta es cero, lo que implica aceleración nula (velocidad constante)."
    ],
    prediction: {
      question: "Cuando un objeto cae en el agua y la fuerza de resistencia del agua crece hasta igualar exactamente a su peso, ¿qué sucederá con la velocidad de caída a partir de ese instante?",
      options: [
        "A) Sigue aumentando indefinidamente.",
        "B) Disminuye progresivamente hasta detenerse.",
        "C) Se mantiene constante (rapidez terminal).",
        "D) Empieza a rebotar hacia arriba y hacia abajo."
      ],
      explanation: {
        "A": "Incorrecto. La velocidad solo aumenta si la fuerza neta es distinta de cero y apunta hacia abajo.",
        "B": "Incorrecto. El objeto no se detiene; al anularse las fuerzas opuestas, simplemente deja de acelerar.",
        "C": "¡Espectacular deducción! Cuando la resistencia del fluido iguala al peso, la fuerza neta es cero. De acuerdo con la Primera Ley de Newton, el objeto continuará moviéndose con velocidad constante (rapidez terminal).",
        "D": "Incorrecto. No existen fuerzas restauradoras que provoquen oscilaciones."
      }
    },
    saber11: {
      context: "En tres instantes diferentes, un estudiante dibuja el diagrama de cuerpo libre para una piedra que cae en un estanque de agua, como se muestra en la siguiente figura. (Simulación del diagrama: En el instante 1, el peso hacia abajo supera la resistencia del agua; en el instante 2, la resistencia del agua ha aumentado pero sigue siendo menor que el peso; en el instante 3, la resistencia del agua hacia arriba iguala exactamente en magnitud al peso hacia abajo).",
      questionText: "Si el estudiante mide la aceleración de la piedra después del tercer instante, se espera que su magnitud, respecto a los otros instantes, sea",
      options: [
        { key: "A", text: "mayor que la del primer instante, porque el peso hace que la piedra se acelere hacia abajo." },
        { key: "B", text: "mayor que el primer instante, porque el peso de la piedra disminuye cuando la fuerza de resistencia comienza a aumentar." },
        { key: "C", text: "constante, porque la aceleración de la piedra siempre es igual que la aceleración de la gravedad." },
        { key: "D", text: "nula, porque después del tercer instante, el peso de la piedra y la fuerza de resistencia se cancelan." }
      ],
      correctAnswer: "D",
      pedagogicalFeedback: "De acuerdo con el diagrama de cuerpo libre para el tercer instante, el peso de la piedra (dirigido hacia abajo) y la fuerza de resistencia del agua (dirigida hacia arriba) son de igual magnitud y opuestas en dirección. Al sumarlas, la fuerza neta resultante es nula (∑F = 0). Según la Segunda Ley de Newton, la aceleración de un cuerpo es igual a la fuerza neta dividida por su masa (a = Fneta/m). Como la fuerza neta es cero, la aceleración resultante es nula (a = 0 m/s²), manteniendo una velocidad de caída constante a partir de ese momento. La opción correcta es la D."
    },
    xpReward: 100,
    coinsReward: 30
  },
  {
    id: 12,
    title: "12. El Mandoble del Destino",
    conceptTitle: "Segunda Ley de Newton (Fuerza y Aceleración)",
    narrative: "¡Excelente trabajo, recluta! Nova te felicita por superar la primera prueba. Ahora nos enfrentamos a un tubo vertical por el que viaja una pelota. Nova te pregunta: ¿qué relación debe haber entre las fuerzas que actúan sobre la pelota para provocar un movimiento acelerado hacia arriba?",
    concepts: [
      "Segunda Ley de Newton (F = m · a): La aceleración de un objeto es directamente proporcional a la fuerza neta que actúa sobre él e inversamente proporcional a su masa.",
      "Fuerza de Empuje del Aire: Fuerza vertical hacia arriba ejercida por el aire soplado.",
      "Fuerza Gravitacional (Peso): Fuerza constante dirigida verticalmente hacia abajo (W = m · g)."
    ],
    prediction: {
      question: "Para que un objeto experimente una aceleración neta vertical hacia arriba, ¿cuál debe ser la relación entre la fuerza aplicada hacia arriba y su peso?",
      options: [
        "A) La fuerza hacia arriba debe ser menor que el peso.",
        "B) La fuerza hacia arriba debe ser igual al peso.",
        "C) La fuerza hacia arriba debe ser mayor que el peso.",
        "D) No se requiere ninguna fuerza hacia arriba."
      ],
      explanation: {
        "A": "Incorrecto. Si la fuerza hacia arriba es menor que el peso, la fuerza neta apunta hacia abajo y el objeto acelerará hacia abajo.",
        "B": "Incorrecto. Si son iguales, la fuerza neta es cero y el sistema está en equilibrio (reposo o velocidad constante).",
        "C": "¡Fantástico! Para tener una aceleración vertical hacia arriba (a > 0), la fuerza neta debe ser mayor que cero en dirección vertical ascendente (F_aire - W > 0), lo que exige que F_aire sea estrictamente mayor que el peso.",
        "D": "Incorrecto. Sin fuerzas hacia arriba, la gravedad acelerará el objeto exclusivamente hacia abajo."
      }
    },
    saber11: {
      context: "Un estudiante sopla una pelota por un tubo vertical como muestra la figura. La pelota sube aceleradamente por el tubo.",
      questionText: "Esto ocurre porque",
      options: [
        { key: "A", text: "el peso de la pelota cambia cuando el estudiante sopla aire por el tubo." },
        { key: "B", text: "la fuerza que ejerce el aire que sopla el estudiante es igual que el peso de la pelota." },
        { key: "C", text: "el peso de la pelota es mayor que la fuerza del aire que sopla el estudiante." },
        { key: "D", text: "la fuerza que ejerce el aire que sopla el estudiante es mayor que el peso de la pelota." }
      ],
      correctAnswer: "D",
      pedagogicalFeedback: "Para que la pelota suba de forma acelerada (es decir, que experimente una aceleración vertical hacia arriba), la fuerza neta resultante en el eje vertical debe ser mayor que cero y apuntar en esa dirección. Puesto que las únicas fuerzas externas que actúan sobre la pelota en el eje vertical son su peso (dirigido hacia abajo) y la fuerza generada por el soplo de aire (dirigida hacia arriba), la fuerza neta es Fneta = F_aire - Peso. Para que esta fuerza genere aceleración hacia arriba, se requiere que F_aire sea estrictamente mayor que el Peso. Por ende, la opción correcta es la D."
    },
    xpReward: 120,
    coinsReward: 35
  },
  {
    id: 13,
    title: "13. El Choque de Alabardas",
    conceptTitle: "Cantidad de Movimiento y Colisiones",
    narrative: "¡Impresionante, recluta! Nova se quita el sombrero. Para el tercer desafío de la arena, nos enfrentamos a una colisión. Un carro móvil recibe un objeto que cae verticalmente sobre él. Nova te pregunta: ¿cómo afecta esta masa adicional a la rapidez horizontal de todo el conjunto?",
    concepts: [
      "Conservación de la Cantidad de Movimiento Horizontal: Si no actúan fuerzas externas netas en el eje horizontal, el momento lineal horizontal total del sistema se mantiene constante (Px = cte).",
      "Cantidad de Movimiento (P = m · v): El producto de la masa por la velocidad de un cuerpo.",
      "Choque Completamente Inelástico: Las masas se acoplan y continúan su movimiento con una velocidad común compartida."
    ],
    prediction: {
      question: "Si añadimos masa verticalmente en un carro en movimiento horizontal sin fricción, ¿cuál de los siguientes enunciados describe correctamente la velocidad horizontal resultante?",
      options: [
        "A) La velocidad horizontal aumenta proporcionalmente al peso añadido.",
        "B) La velocidad horizontal disminuye debido a la conservación del momento lineal.",
        "C) La velocidad horizontal no sufre ningún tipo de cambio.",
        "D) El carro frena instantáneamente hasta detenerse por completo."
      ],
      explanation: {
        "A": "Incorrecto. Para que aumentara, tendríamos que aplicar una fuerza o impulso en la dirección horizontal del movimiento.",
        "B": "¡Brillante deducción! Puesto que el momento lineal horizontal total se conserva (Px = M · V1 = (M + m) · V_final), el incremento de la masa total implica de manera obligatoria una reducción proporcional en la velocidad horizontal conjunta.",
        "C": "Incorrecto. Aunque la fuerza es perpendicular, el incremento de masa inercial horizontal desacelera el sistema.",
        "D": "Incorrecto. No se detiene, continúa moviéndose pero a una velocidad menor."
      }
    },
    saber11: {
      context: "Un carro de masa M, se mueve sobre una superficie horizontal con velocidad V1 en la dirección que ilustra la figura (1). En cierto instante un objeto de masa m que se mueve perpendicular a la superficie, cae en el interior del carro y continúan moviéndose los dos como se muestra en la figura (2). Desprecie el rozamiento entre la superficie de la carretera y el carro.",
      questionText: "La rapidez del carro después de que el objeto cae dentro de él",
      options: [
        { key: "A", text: "disminuye porque la cantidad de masa que se desplaza horizontalmente aumenta." },
        { key: "B", text: "aumenta porque durante el choque el carro adquiere la velocidad del objeto que cae." },
        { key: "C", text: "aumenta porque al caer el objeto le da un impulso adicional al carro." },
        { key: "D", text: "no cambia porque el momento del objeto es perpendicular al del carro." }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "En este sistema, dado que no hay fricción con la carretera, la fuerza externa neta horizontal sobre el sistema (carro + objeto) es igual a cero. Por lo tanto, el momento lineal horizontal total (Px) debe conservarse de forma rigurosa antes y después del impacto: Px_inicial = Px_final.\nInicialmente, solo el carro de masa M tiene movimiento horizontal con rapidez V1 (el objeto cae perpendicularmente, es decir, con velocidad horizontal cero). Así, Px_inicial = M · V1.\nDespués del choque, ambos cuerpos se mueven juntos a una velocidad horizontal común V_final, con una masa combinada de (M + m). Así, Px_final = (M + m) · V_final.\nIgualando ambos términos: M · V1 = (M + m) · V_final => V_final = V1 · [M / (M + m)].\nDado que M / (M + m) es una fracción menor que 1, la rapidez final V_final del carro disminuye de manera inevitable. Físicamente, esto ocurre porque la masa inercial del sistema que se desplaza horizontalmente ha aumentado. Por consiguiente, la opción correcta es la A."
    },
    xpReward: 110,
    coinsReward: 25
  },
  {
    id: 14,
    title: "14. La Fricción de la Arena",
    conceptTitle: "Primera Ley de Newton (Inercia)",
    narrative: "¡Sensacional, recluta! Nova observa tu increíble progreso. Para el cuarto desafío, analizaremos la experiencia cotidiana de salir de un vehículo escolar que se encuentra en movimiento. Nova te pregunta: ¿por qué tendemos a caernos hacia adelante cuando nos bajamos de un bus en movimiento?",
    concepts: [
      "Ley de la Inercia (Primera Ley de Newton): Un objeto mantiene su estado de reposo o movimiento rectilíneo uniforme a menos que actúe una fuerza externa neta sobre él.",
      "Estado de Movimiento Relativo: El cuerpo del pasajero viaja inicialmente con la misma rapidez que el vehículo.",
      "Fuerza de Fricción con el Suelo: Al pisar el suelo, los pies del estudiante se detienen instantáneamente por fricción, pero la inercia mantiene el resto de su cuerpo en movimiento hacia adelante."
    ],
    prediction: {
      question: "Si una nave espacial frena repentinamente sus motores de aceleración, ¿qué sucederá con un astronauta suelto dentro de la cabina de mandos?",
      options: [
        "A) Saldrá proyectado hacia atrás de forma brusca.",
        "B) Continuará desplazándose hacia adelante con la velocidad original que llevaba la nave.",
        "C) Se detendrá instantáneamente junto con la estructura de la nave.",
        "D) Comenzará a ascender flotando verticalmente."
      ],
      explanation: {
        "A": "Incorrecto. No hay ninguna fuerza empujándolo hacia atrás; es la nave la que reduce su velocidad.",
        "B": "¡Sublime razonamiento! Debido a la inercia, el cuerpo del astronauta mantiene el estado cinemático y la velocidad que poseía antes del frenado, desplazándose hacia adelante respecto a la nave.",
        "C": "Incorrecto. Sin fuerzas externas de retención (como un cinturón), su cuerpo no se detendrá simultáneamente con la nave.",
        "D": "Incorrecto. No existen causas dinámicas para que se desvíe en dirección vertical."
      }
    },
    saber11: {
      context: "Un estudiante de undécimo afirma que cuando se bajó del bus escolar casi se cae de este, pues aun se encontraba en movimiento.",
      questionText: "El argumento científico para dar explicación a este fenómeno se relaciona con la",
      options: [
        { key: "A", text: "ley de la inercia y la conservación del movimiento." },
        { key: "B", text: "inercia que tenía su cuerpo al pisar el suelo." },
        { key: "C", text: "ley de acción y reacción de Newton." },
        { key: "D", text: "ley del movimiento de Newton." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "Este suceso es una demostración clásica de la Primera Ley de Newton o Ley de la Inercia. Mientras el estudiante viaja en el bus, todo su cuerpo posee la misma velocidad y dirección que el vehículo. Al bajarse del bus en movimiento y pisar el suelo firme, la fuerza de fricción detiene de forma instantánea sus pies al entrar en contacto con la carretera. Sin embargo, debido a la inercia, la parte superior de su cuerpo (el torso) tiende a conservar el movimiento y la rapidez que llevaba de viaje. Esta diferencia de velocidades entre sus pies (detenidos) y su torso (en movimiento hacia adelante) es lo que provoca que se incline hacia adelante y pierda el equilibrio, casi cayendo. Por lo tanto, el argumento físico directo se asocia a la inercia que poseía su cuerpo en el instante de pisar el suelo, correspondiente con la opción B."
    },
    xpReward: 120,
    coinsReward: 30
  },
  {
    id: 15,
    title: "15. El Elevador del Foso",
    conceptTitle: "Sistemas de Masas y Tensiones",
    narrative: "¡Fantástico avance, recluta! Nova está asombrada. En esta quinta prueba, investigaremos las fuerzas mecánicas de contacto que actúan sobre sistemas físicos de varios cuerpos. Nova te pregunta: ¿en qué condiciones mecánicas un sistema NO presenta una fuerza de soporte Normal?",
    concepts: [
      "Fuerza Normal (N): Fuerza de reacción de soporte ejercida perpendicularmente por una superficie sólida sobre un objeto apoyado en ella.",
      "Fuerza de Tensión (T): Fuerza de tracción aplicada a lo largo de un cable, cuerda o hilo ideal.",
      "Fuerza de Gravedad (Peso - W): Fuerza de atracción gravitatoria constante ejercida de manera vertical hacia abajo por el planeta."
    ],
    prediction: {
      question: "Si colgamos un bloque verticalmente del techo por medio de una cuerda sin que toque ninguna pared o el piso, ¿cuáles son las únicas fuerzas que actúan sobre dicho bloque?",
      options: [
        "A) Peso y Normal únicamente.",
        "B) Tensión y Normal únicamente.",
        "C) Tensión y Peso únicamente.",
        "D) Peso, Tensión y Normal simultáneamente."
      ],
      explanation: {
        "A": "Incorrecto. No hay Normal porque el bloque no está apoyado sobre ninguna superficie sólida.",
        "B": "Incorrecto. El peso siempre actúa debido a la gravedad terrestre, y la Normal no existe al estar suspendido.",
        "C": "¡Extraordinario! Al estar suspendido en el aire, el cuerpo solo interactúa con la cuerda que lo sostiene (fuerza de Tensión hacia arriba) y con el campo gravitatorio de la Tierra (peso hacia abajo). No experimenta fuerza Normal.",
        "D": "Incorrecto. La fuerza Normal requiere obligatoriamente una superficie de apoyo físico."
      }
    },
    saber11: {
      context: "Un sistema de dos cuerpos está sometido a la acción de tres fuerzas: Peso, Tensión y Normal. Analiza las siguientes descripciones de sistemas de dos masas conectados por cables ideales:\n- **Gráfica A:** Un bloque en reposo sobre una mesa horizontal con fricción, atado por un cable a otro bloque colgante vertical.\n- **Gráfica B:** Dos bloques apoyados en sendos planos inclinados con fricción, conectados entre sí por una cuerda que pasa por una polea.\n- **Gráfica C:** Dos bloques colgados de manera vertical y suspendidos en el aire a cada extremo de una cuerda que pasa por una polea (Máquina de Atwood vertical pura sin superficies de apoyo).\n- **Gráfica D:** Un bloque sobre un plano horizontal rugoso atado por una cuerda a otro bloque sobre una rampa inclinada con rozamiento.",
      questionText: "Según la información anterior, el sistema que NO está sometido a la acción de los tres tipos de fuerza es:",
      options: [
        { key: "A", text: "Gráfica A." },
        { key: "B", text: "Gráfica B." },
        { key: "C", text: "Gráfica C." },
        { key: "D", text: "Gráfica D." }
      ],
      correctAnswer: "C",
      pedagogicalFeedback: "Para que existan las tres fuerzas descritas (Peso, Tensión y Normal), los cuerpos del sistema deben cumplir con las siguientes condiciones físicas: 1. Tener masa, lo que garantiza la presencia del Peso (W = m·g). 2. Estar conectados por cables o cuerdas tensadas, lo que da origen a la fuerza de Tensión (T). 3. Estar apoyados o en contacto con una superficie física sólida que ejerza la fuerza de soporte Normal (N).\nEn el caso de la Gráfica C (Máquina de Atwood vertical), ambos bloques se encuentran suspendidos libremente en el aire. Al no existir ninguna superficie sólida de apoyo, la fuerza Normal es nula (N = 0) para ambos cuerpos. Por tanto, este sistema está sometido únicamente a las fuerzas de Peso y Tensión, por lo que NO cumple con estar sometido a los tres tipos de fuerzas solicitados. La respuesta correcta es la C."
    },
    xpReward: 130,
    coinsReward: 35
  },
  {
    id: 16,
    title: "16. El Mangonel de Asedio",
    conceptTitle: "Sistemas de Masas en Equilibrio",
    narrative: "¡Es el reto supremo del Módulo 2, recluta! Nova te aplaude con orgullo. Hemos llegado al último desafío mecánico de la arena: la famosa Máquina de Atwood. Nova te pregunta: ¿en qué condiciones de masas se puede garantizar el equilibrio estático total del sistema?",
    concepts: [
      "Máquina de Atwood: Dispositivo que consta de una polea sin fricción de la que penden dos masas mediante un cable ideal vertical.",
      "Condición de Equilibrio (∑F = 0): Para que el sistema no acelere (permanezca en reposo o velocidad constante), la aceleración debe ser cero.",
      "Balance de Masas: Si las masas conectadas son exactamente iguales (m1 = m2), las fuerzas gravitatorias opuestas se equilibran mutuamente."
    ],
    prediction: {
      question: "En una Máquina de Atwood vertical sin fricción, si colocamos dos masas de idéntica magnitud en cada extremo de la cuerda (m1 = m2), ¿cómo será el movimiento de las masas?",
      options: [
        "A) La masa de la derecha caerá rápidamente acelerada.",
        "B) Ambas masas caerán por gravedad en caída libre separadas de la cuerda.",
        "C) El sistema permanecerá estático o en equilibrio de reposo sin aceleración alguna.",
        "D) El sistema girará en círculos de forma continua."
      ],
      explanation: {
        "A": "Incorrecto. Al ser de masas iguales, ninguna de las fuerzas gravitatorias es mayor para vencer a la otra.",
        "B": "Incorrecto. La cuerda permanece tensa y las retiene, por lo que no hay caída libre.",
        "C": "¡Brillante! Si las masas son iguales, sus pesos son idénticos. Como tiran en sentidos opuestos a través de la polea, las fuerzas se balancean exactamente, dando una fuerza neta horizontal nula sobre la cuerda, asegurando el equilibrio.",
        "D": "Incorrecto. El movimiento es puramente lineal vertical, no circular."
      }
    },
    saber11: {
      context: "Se conoce como máquina de Atwood a un dispositivo que consta de una polea sin fricción y de masa despreciable de la cual cuelgan distintas masas de forma vertical, como se muestra en la figura.",
      questionText: "Si m1= 10 Kg, entonces, para que el sistema se encuentre en equilibrio debe cumplirse que:",
      options: [
        { key: "A", text: "m2 = 10kg" },
        { key: "B", text: "m2 = 15kg" },
        { key: "C", text: "m2 = 1kg" },
        { key: "D", text: "m2 = 20kg" }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "Para que la máquina de Atwood se encuentre en equilibrio mecánico total, la aceleración (a) del sistema debe ser exactamente igual a cero. La aceleración teórica se deriva aplicando la Segunda Ley de Newton a ambos bloques, resultando en: a = g · |m2 - m1| / (m1 + m2). Para lograr el equilibrio (a = 0), el numerador debe ser cero, lo que implica |m2 - m1| = 0, es decir, m2 = m1. Dado que m1 = 10 kg, la masa m2 debe ser de forma matemática igual a 10 kg. En esta situación, el peso de m1 (100 N hacia abajo) y el de m2 (100 N hacia abajo) tiran con la misma intensidad sobre la polea en sentidos opuestos, equilibrando la tensión de la cuerda en 100 N y logrando un sistema balanceado. La respuesta correcta es la A."
    },
    xpReward: 140,
    coinsReward: 40
  }
];

export const THERMODYNAMICS_LEVELS: Level[] = [
  {
    id: 17,
    title: "17. La Montaña Rusa y la Energía Potencial",
    conceptTitle: "Energía Potencial Gravitacional y Trayectoria",
    narrative: "Los Extrovers analizan las lecturas telemétricas de un vagón en una montaña rusa experimental. El sensor registró cómo varía la energía potencial gravitacional en función de la coordenada horizontal de posición. Brayan, Michell y Alisson deben identificar cuál modelo de pista explica fielmente la curva de datos.",
    concepts: [
      "Energía Potencial Gravitacional: Ep = m • g • h (directamente proporcional a la altura h sobre el nivel de referencia).",
      "Geometría de la Pista: Como la masa (m) y la aceleración gravitacional (g) son constantes, la gráfica de Ep(x) calca exactamente el perfil de relieve de la montaña rusa.",
      "Puntos críticos: Los picos máximos de la gráfica corresponden a las cimas más altas de la pista, y los mínimos a los valles más profundos."
    ],
    prediction: {
      question: "Si un vagón desciende desde una colina alta a un valle profundo y luego sube a una colina más baja, ¿cómo será la gráfica de su energía potencial Ep respecto a la posición x?",
      options: [
        "A) Una línea recta horizontal constante sin importar la altura de la pista.",
        "B) Una curva que desciende a un mínimo y luego sube a un pico intermedio, calcando el relieve de la pista.",
        "C) Una línea vertical discontinua sin relación con el espacio recorrido.",
        "D) Cero en todo el trayecto porque la energía potencial no depende de la altura."
      ],
      explanation: {
        "A": "Incorrecto. La energía potencial cambia al variar la altura según Ep = mgh.",
        "B": "¡Correcto! La energía potencial gravitacional es directamente proporcional a la altura (Ep = mgh), por lo que la curva energética reproduce fielmente el perfil de relieve de la montaña rusa.",
        "C": "Incorrecto. La posición x avanza continuamente en el tiempo.",
        "D": "Incorrecto. La energía potencial gravitacional depende estrictamente de la altura h."
      }
    },
    saber11: {
      context: "Pregunta 5 de la prueba Saber 11:\nUn estudiante midió la energía potencial de un vagón en una montaña rusa. La gráfica representa los datos obtenidos por el estudiante (muestra una altura inicial alta, un valle profundo, una cresta intermedia y un descenso final):",
      imageUrl: "/images/img_7.png",
      questionText: "De los siguientes modelos de montaña rusa, ¿cuál explica la gráfica obtenida por el estudiante?",
      options: [
        { key: "A", text: "Modelo A (la pista inicia en una colina alta, desciende a un valle profundo, sube a una cresta de menor altura y desciende suavemente)." },
        { key: "B", text: "Modelo B (la pista inicia a nivel del suelo y sube constantemente en línea recta)." },
        { key: "C", text: "Modelo C (la pista presenta dos crestas de igual altura máxima separadas por un valle)." },
        { key: "D", text: "Modelo D (la pista tiene un perfil horizontal sin elevaciones ni valles)." }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "La energía potencial gravitacional está dada por la expresión Ep = m·g·h. Dado que la masa del vagón (m) y la aceleración gravitacional (g) permanecen constantes durante todo el recorrido, la energía potencial Ep es directamente proporcional a la altura h del vagón en cada punto (Ep ∝ h). Por lo tanto, el gráfico de energía potencial en función de la coordenada de posición x tiene la misma forma geométrica que el perfil de la montaña rusa. La gráfica muestra un punto inicial alto, un valle profundo, una cresta intermedia y un descenso final, lo cual coincide exactamente con el Modelo A."
    },
    xpReward: 120,
    coinsReward: 35
  },
  {
    id: 18,
    title: "18. Salto Bungee y Transformación de Energía",
    conceptTitle: "Conservación de la Energía Mecánica y Caída Libre",
    narrative: "Durante un entrenamiento de supervivencia en gravedad terrestre, Michell observa a un deportista realizando un salto bungee desde un puente de 65 metros de altura. La banda elástica mide 30 metros sin estirar. Cuando el saltador ha descendido apenas 20 metros, el equipo debe determinar qué transformación energética ocurre.",
    concepts: [
      "Longitud natural (L₀ = 30 m): Mientras la persona cae una distancia menor a 30 m, la cuerda elástica permanece floja y no ejerce fuerza restauradora (F_elástica = 0 y Epe = 0).",
      "Caída libre inicial: Durante los primeros 30 metros de caída, el saltador actúa bajo la única acción del peso (gravedad).",
      "Transformación energética: La pérdida de altura disminuye la energía potencial gravitacional (Epg = m·g·h), transformándola íntegramente en energía cinética (Ec = 1/2·m·v²)."
    ],
    prediction: {
      question: "Si te lanzas con una cuerda elástica de 30 metros de longitud y caes los primeros 10 metros, ¿la cuerda ya ejerce fuerza elástica sobre ti?",
      options: [
        "A) Sí, la cuerda frena desde el primer milímetro de caída libre.",
        "B) No, la cuerda aún no se estira y estás en caída libre transformando energía potencial gravitacional en cinética.",
        "C) Sí, porque la masa de la cuerda atrae al cuerpo hacia arriba gravitacionalmente.",
        "D) No, la energía mecánica total se destruye instantáneamente."
      ],
      explanation: {
        "A": "Incorrecto. Una banda elástica solo ejerce fuerza cuando se estira más allá de su longitud natural (L > 30m).",
        "B": "¡Excelente deducción! Al no haber sobrepasado los 30 m de longitud sin estirar, la banda elástica no está tensionada, por lo que la energía potencial gravitatoria se transforma exclusivamente en energía cinética.",
        "C": "Incorrecto. La cuerda no actúa hasta que se estira.",
        "D": "Incorrecto. La energía siempre se conserva en ausencia de fricción."
      }
    },
    saber11: {
      context: "Pregunta 6 de la prueba Saber 11:\nEl salto bungee se practica generalmente en puentes (ver figura).\nEn uno de estos saltos, se utiliza una banda elástica que tiene una longitud sin estirar de 30 metros y que puede estirar 30 metros más.\nEn un salto, un deportista se lanzará desde un puente de 65 metros de altura. Cuando ha descendido apenas 20 metros de altura (ver figura):",
      imageUrl: "/images/img_9.png",
      questionText: "La transformación de energía que se habrá dado hasta ese momento será de:",
      options: [
        { key: "A", text: "energía cinética a potencial elástica." },
        { key: "B", text: "energía cinética a potencial gravitacional." },
        { key: "C", text: "energía potencial gravitacional a potencial elástica." },
        { key: "D", text: "energía potencial gravitacional a cinética." }
      ],
      correctAnswer: "D",
      pedagogicalFeedback: "La banda elástica tiene una longitud natural (sin estirar) de 30 metros. Como el deportista ha descendido apenas 20 metros, la cuerda todavía no ha comenzado a estirarse ni a tensionarse, de modo que la energía potencial elástica es nula (Epe = 0). Durante estos primeros 20 metros de caída, el saltador pierde altura (disminuyendo su energía potencial gravitacional, Epg = m·g·h) y gana rapidez en caída libre, transformando dicha energía en energía cinética (Ec = 1/2·m·v²). Por ende, la transformación ocurrida es de energía potencial gravitacional a cinética (Opción D)."
    },
    xpReward: 125,
    coinsReward: 35
  },
  {
    id: 19,
    title: "19. Rapidez en la Pista Sin Fricción",
    conceptTitle: "Conservación de la Energía Mecánica",
    narrative: "Los Extrovers analizan un tramo de montaña rusa sin fricción. Un carrito de masa m parte del punto 1 (altura h) con velocidad v1 y se detiene exactamente al alcanzar el punto 4 (altura 2h). Alisson y Brayan deben calcular la rapidez inicial v1.",
    concepts: [
      "Conservación de la Energía Mecánica: En ausencia de fricción, Em = Ec + Ep = constante en cada punto.",
      "Energía en el punto 4: Como el carro se detiene (v4 = 0) a altura 2h, Em = m·g·(2h) = 2mgh.",
      "Balance en el punto 1: Em = 1/2·m·v1² + m·g·h = 2mgh ⇒ 1/2·m·v1² = mgh ⇒ v1 = √(2gh)."
    ],
    prediction: {
      question: "Si un objeto parte de una altura h con velocidad v1 y logra subir sin fricción hasta una altura final 2h donde se detiene (v = 0), ¿cuánta energía cinética inicial en el punto 1 debió tener?",
      options: [
        "A) Cero, porque sube impulsado espontáneamente por la gravedad.",
        "B) Exactamente m·g·h, la energía necesaria para ganar la diferencia de altura Δh = 2h - h = h.",
        "C) 4 m·g·h, cuatro veces la energía potencial inicial.",
        "D) Infinita energía cinética."
      ],
      explanation: {
        "A": "Incorrecto. La gravedad frena la subida, se requiere energía cinética para ascender.",
        "B": "¡Brillante! Por conservación de la energía, la energía cinética inicial se convierte en la energía potencial adicional para subir la altura faltante (Δh = h), por lo que 1/2 m v1² = mgh, resultando v1 = √(2gh).",
        "C": "Incorrecto. Solo requiere compensar la elevación adicional h.",
        "D": "Incorrecto. El balance energético es finito y exacto."
      }
    },
    saber11: {
      context: "RESPONDA LAS PREGUNTAS 7 Y 8 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN\n\nLa figura muestra un tramo de una montaña rusa sin fricción.\nSe sabe que la energía cinética es: Ec = 1/2 m v² y que la energía potencial es: Ep = m g h.\nEl bloque parte del punto 1 (altura h) con velocidad v1 y se detiene en el punto 4 (altura 2h):",
      imageUrl: "/images/img_11.png",
      questionText: "La energía mecánica del carro es tal que cuando llega al punto 4 se encuentra en reposo, entonces la velocidad del carro en 1 es:",
      options: [
        { key: "A", text: "v1 = √(2gh)" },
        { key: "B", text: "v1 = 2√(gh)" },
        { key: "C", text: "v1 = 3√(gh)" },
        { key: "D", text: "v1 = √(gh/2)" }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "Dado que no existe rozamiento en la pista, la energía mecánica total se conserva: Em = Ec + Ep = constante. En el punto 4, el carro se encuentra momentáneamente en reposo (v4 = 0) a una altura de 2h, de modo que Em = Ep4 = m·g·(2h) = 2mgh. En el punto 1 (a altura h), la energía mecánica total es Em = 1/2·m·v1² + m·g·h. Igualando ambas expresiones: 1/2·m·v1² + mgh = 2mgh ⇒ 1/2·m·v1² = mgh ⇒ v1² = 2gh ⇒ v1 = √(2gh). Por lo tanto, la opción correcta es la A."
    },
    xpReward: 130,
    coinsReward: 40
  },
  {
    id: 20,
    title: "20. Gráfica de Energía Cinética vs Coordenada x",
    conceptTitle: "Energía Cinética en Función de la Posición",
    narrative: "Continuando con el análisis de la montaña rusa de la pregunta anterior, los Extrovers grafican cómo evoluciona la energía cinética Ec(x) a medida que el carro viaja por los puntos 1, 2, 3 y 4 de la pista.",
    concepts: [
      "Relación inversa entre Ec y Ep: Como Em = Ec(x) + Ep(x) = constante, tenemos que Ec(x) = Em - m·g·h(x).",
      "Punto 1 (h=h): Ec(1) = 2mgh - mgh = mgh > 0 (valor intermedio positivo).",
      "Punto 2 (valle, h=0): Ec(2) = 2mgh - 0 = 2mgh (máximo absoluto de energía cinética).",
      "Punto 3 (colina, h=h): Ec(3) = 2mgh - mgh = mgh (valle local intermedio).",
      "Punto 4 (cima, h=2h): Ec(4) = 2mgh - 2mgh = 0 (la curva llega a cero y toca el eje horizontal)."
    ],
    prediction: {
      question: "En una pista sin fricción, ¿en cuál punto la energía cinética de un carro es MÁXIMA?",
      options: [
        "A) En el punto más alto de la montaña rusa.",
        "B) En el punto más bajo (valle, h = 0) porque toda la energía potencial se ha convertido en energía cinética.",
        "C) En el punto de partida sin importar su elevación.",
        "D) En ningún punto, la energía cinética permanece en cero constante."
      ],
      explanation: {
        "A": "Incorrecto. En la cumbre la energía potencial es máxima y la cinética mínima.",
        "B": "¡Exacto! Al ser h = 0 en el valle, Ep = 0 y toda la energía mecánica disponible se manifiesta como energía cinética (Ec = Em), alcanzando la máxima velocidad.",
        "C": "Incorrecto. Depende del intercambio de alturas.",
        "D": "Incorrecto. Hay movimiento y rapidez."
      }
    },
    saber11: {
      context: "Pregunta 8 de la prueba Saber 11:\nEn la situación del punto anterior (montaña rusa sin fricción donde el bloque parte de 1 con v1 = √(2gh), pasa por el valle 2 a h=0, por 3 a h=h, y se detiene en 4 a h=2h):",
      imageUrl: "/images/img_13.png",
      questionText: "La gráfica de la energía cinética como función de la coordenada x asociada a este movimiento es:",
      options: [
        { key: "A", text: "gráfica A" },
        { key: "B", text: "gráfica B (inicia en valor positivo en 1, alcanza su pico máximo en 2, desciende a un valle intermedio en 3 y llega a cero en 4)" },
        { key: "C", text: "gráfica C" },
        { key: "D", text: "gráfica D" }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "La energía mecánica total del sistema es constante (Em = Ec + Ep). Por lo tanto, la energía cinética en cualquier posición x viene dada por Ec(x) = Em - m·g·h(x). Analizando cada punto: en x=1 (h=h), Ec = mgh > 0; en x=2 (punto más bajo, h=0), Ec alcanza su valor máximo absoluto (Ec = 2mgh); en x=3 (h=h), Ec desciende al valor intermedio mgh; y en x=4 (altura máxima 2h donde se detiene), la velocidad es cero y por ende Ec = 0 (la curva toca exactamente el eje horizontal). La gráfica B es la única que describe fielmente este comportamiento."
    },
    xpReward: 135,
    coinsReward: 40
  },
  {
    id: 21,
    title: "21. Juan el Patinador Extremo: Ascenso y Gravedad",
    conceptTitle: "Dinámica y Conservación en Pistas Curvas",
    narrative: "Juan es un patinador extremo con masa de 60 kg (junto con la patineta) que parte del reposo desde el punto A a 3 metros de altura. Desciende pasando por el punto B (suelo) y sube por la rampa contraria. A 1,5 metros de altura sobre B, Los Extrovers analizan cómo la gravedad afecta su movimiento.",
    concepts: [
      "Energía mecánica inicial: En el punto A (hA = 3 m, vA = 0), Em = EpA = 60 kg · g · 3 m = 180g Joules.",
      "Punto más bajo (B, h = 0): Toda la energía potencial se transforma en cinética (Ec = 180g J), alcanzando su rapidez máxima.",
      "Ascenso hacia 1,5 m: Al subir, la aceleración de gravedad apunta hacia abajo en contra del movimiento vertical, frenando progresivamente al patinador y disminuyendo su velocidad."
    ],
    prediction: {
      question: "Cuando un patinador sube por una rampa después de pasar por el punto más bajo, ¿qué efecto tiene la aceleración de la gravedad sobre su rapidez?",
      options: [
        "A) Hace que su velocidad aumente indefinidamente hacia arriba.",
        "B) Disminuye su velocidad porque el peso apunta hacia abajo frenando el ascenso.",
        "C) La gravedad desaparece por completo durante la subida.",
        "D) La masa del patinador se duplica automáticamente."
      ],
      explanation: {
        "A": "Incorrecto. En la subida la gravedad se opone al movimiento.",
        "B": "¡Correcto! Al ascender, la aceleración gravitacional apunta en sentido contrario al desplazamiento vertical, reduciendo la velocidad a medida que la energía cinética se reconvierte en energía potencial gravitatoria.",
        "C": "Incorrecto. La gravedad actúa en todo momento.",
        "D": "Incorrecto. La masa es una propiedad intrínseca constante."
      }
    },
    saber11: {
      context: "RESPONDA LAS PREGUNTAS 9 Y 10 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN\n\nJuan es un patinador extremo y en esta ocasión desea probar su talento en una pista como la que se muestra en la figura. Su masa, junto con la de la patineta, es de 60 kg y parte del reposo del punto A, a una altura de 3m:",
      imageUrl: "/images/img_12.png",
      questionText: "Si Juan se desliza desde el punto A, atravesando el punto B, entonces cuando alcanza una altura de 1,5m con respecto al punto B, podemos afirmar que:",
      options: [
        { key: "A", text: "aumenta la velocidad debido al aumento de la aceleración." },
        { key: "B", text: "disminuye la velocidad debido a la aceleración de gravedad." },
        { key: "C", text: "la energía cinética es mayor que la energía potencial inicial." },
        { key: "D", text: "la energía potencial es la tercera parte que la energía potencial inicial." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "Al deslizarse desde el punto A hasta el punto B, Juan gana velocidad y energía cinética. Sin embargo, una vez cruza el punto B y comienza a ascender por la rampa hacia la altura de 1,5 m, la fuerza de gravedad (y la aceleración gravitacional g) actúa en dirección opuesta a su movimiento vertical, reduciendo progresivamente su rapidez (disminuyendo la energía cinética para transformarla en energía potencial). Además: en h = 1,5 m, la energía potencial es Ep = 60·g·1.5 = 90g J, que corresponde a la MITAD (no a la tercera parte) de la energía potencial inicial (180g J), y la energía cinética es Ec = 180g - 90g = 90g J (menor que la energía potencial inicial). Por lo tanto, la única afirmación verdadera y fundamentada físicamente es la B."
    },
    xpReward: 140,
    coinsReward: 40
  },
  {
    id: 22,
    title: "22. Límite de Altura en la Pista Extrema",
    conceptTitle: "Límites Energéticos en Sistemas Conservativos",
    narrative: "Para culminar la prueba del Módulo 3, Brayan, Michell y Alisson evalúan si Juan con su patineta puede alcanzar el punto C situado en la parte más alta de la rampa opuesta, cuya altura sobrepasa los 3 metros iniciales.",
    concepts: [
      "Principio de Conservación de la Energía: La energía mecánica total fijada en el inicio es Em = m·g·hA = 60 kg · g · 3 m.",
      "Altura máxima teórica (hmáx): En el punto más alto que puede alcanzar, toda la energía cinética vuelve a ser cero (v = 0 ⇒ Ec = 0), por lo que m·g·hmáx = m·g·3 m ⇒ hmáx = 3 metros.",
      "Imposibilidad física: Como el punto C se encuentra a una altura mayor que los 3 metros de partida, Juan no puede alcanzar el punto C sin un impulso o motor externo."
    ],
    prediction: {
      question: "Si sueltas una patineta desde el reposo a 3 metros de altura en una pista sin fricción ni motores, ¿puede subir por sí sola hasta los 4 metros de altura?",
      options: [
        "A) Sí, porque el impulso del viento la empuja espontáneamente hacia arriba.",
        "B) No, porque por conservación de la energía no puede alcanzar una altura mayor a la altura inicial desde la que partió del reposo.",
        "C) Sí, porque la masa crea energía adicional en las curvas.",
        "D) Sí, porque la aceleración de gravedad se invierte al subir."
      ],
      explanation: {
        "A": "Incorrecto. Sin fuerzas externas propulsoras no puede crearse energía.",
        "B": "¡Perfecto! La energía mecánica total está fijada por la altura inicial (Em = m g h_inicial). Como la energía ni se crea ni se destruye, la altura máxima que puede alcanzar en reposo es exactamente igual a la inicial (h_max = 3m).",
        "C": "Incorrecto. Viola el principio de conservación de la energía.",
        "D": "Incorrecto. La gravedad siempre atrae hacia el centro terrestre."
      }
    },
    saber11: {
      context: "Pregunta 10 de la prueba Saber 11:\nJuan es un patinador extremo con masa de 60 kg (junto con la patineta) y parte del reposo del punto A, a una altura de 3m en la pista mostrada en la figura. El punto C se encuentra en la cima de la rampa opuesta a una altura superior a los 3 metros:",
      imageUrl: "/images/img_12.png",
      questionText: "¿Es posible afirmar que Juan con su patineta alcance el punto C de la pista?",
      options: [
        { key: "A", text: "Sí, porque se conserva la energía mecánica y, por lo tanto, llega a ese punto." },
        { key: "B", text: "No, porque el peso aumenta y, por lo tanto, no se conserva la energía mecánica." },
        { key: "C", text: "No, porque de acuerdo con la conservación de la energía, llega a la misma altura inicial." },
        { key: "D", text: "Sí, porque la energía cinética se transforma en energía potencial." }
      ],
      correctAnswer: "C",
      pedagogicalFeedback: "De acuerdo con el Principio de Conservación de la Energía Mecánica (Em = Ec + Ep = constante), la energía mecánica total de Juan está determinada por su estado inicial en el punto A, donde parte del reposo (Ec = 0) a una altura de 3 m: Em = m·g·(3 m). Al subir por la rampa opuesta, la energía cinética se convierte en energía potencial gravitacional. En el punto más alto que puede alcanzar, toda la energía vuelve a ser potencial (m·g·h_máx = m·g·3 m), lo que implica que h_máx = 3 m. Puesto que el punto C está a una altura mayor que los 3 metros iniciales, Juan no puede alcanzar el punto C únicamente con la energía inicial del sistema. La respuesta correcta es la C."
    },
    xpReward: 150,
    coinsReward: 45
  },
  {
    id: 23,
    title: "23. La Alquimia del Equilibrio Térmico",
    conceptTitle: "Equilibrio Térmico y Ley Cero",
    narrative: "Los Extrovers se detienen en una estación de servicio para refrigerar el núcleo de fusión del reactor principal. Deciden sumergir una barra hiper-conductora muy caliente de cobre en un tanque térmico con agua purificada a temperatura fría. Deben predecir la temperatura final que alcanzará el sistema una vez estabilizado.",
    concepts: [
      "Ley Cero de la Termodinámica: Dos cuerpos en contacto térmico intercambian calor hasta igualar su temperatura.",
      "Flujo de calor (Q): El calor fluye espontáneamente desde el cuerpo más caliente al más frío.",
      "Capacidad calorífica (c): Determina la absorción térmica por unidad de masa y grado."
    ],
    prediction: {
      question: "Si ponemos en contacto una pieza de metal caliente a 100 °C con agua destilada a 10 °C en un termo perfectamente aislado, ¿cuál será la temperatura de ambos después de mucho tiempo?",
      options: [
        "A) El metal seguirá a 100 °C y el agua a 10 °C por no poder fusionarse.",
        "B) Alcanzarán una temperatura intermedia común e igual para ambos cuerpos.",
        "C) El agua se calentará a más de 120 °C ganando calor del vacío.",
        "D) El metal descenderá a 0 °C congelando el tanque térmico."
      ],
      explanation: {
        "A": "Incorrecto. Siempre que hay contacto térmico sin barreras aislantes totales, fluye energía disipadora.",
        "B": "¡Espectacular! La Ley Cero de la Termodinámica dicta que los sistemas alcanzan el equilibrio térmico, en el cual las temperaturas de ambos cuerpos se igualan.",
        "C": "Incorrecto. Siempre se halla en un intervalo intermedio.",
        "D": "Incorrecto. No puede bajar de la temperatura más baja disponible libremente."
      }
    },
    saber11: {
      context: "En un laboratorio escolar Saber 11, un estudiante introduce un bloque de hierro a 90 °C en un recipiente con agua a 20 °C. Se estabilizan a 35 °C.",
      questionText: "¿Cuál de las siguientes afirmaciones explica correctamente la transferencia de calor implicada en este experimento?",
      options: [
        { key: "A", text: "La energía térmica fluyó desde el metal caliente hacia el agua fría hasta que las temperaturas de ambos se igualaron a 35 °C." },
        { key: "B", text: "El agua transfirió frío al metal de hierro para balancear la inercia del calor atómico." },
        { key: "C", text: "El sistema aumentó su energía calórica de forma nula debido a la evaporación del cobre." },
        { key: "D", text: "La barra y el agua permanecieron intercambiando calor con el aire exterior por no estar aislados." }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "El calor fluye espontáneamente desde el cuerpo con mayor temperatura (hierro a 90 °C) en dirección al de menor temperatura (agua a 20 °C). Esta transferencia de energía calórica continúa hasta que ambos cuerpos alcanzan el mismo nivel energético macroscópico, equilibrándose en este caso a 35 °C. La respuesta correcta es la A."
    },
    xpReward: 110,
    coinsReward: 35
  },
  {
    id: 24,
    title: "24. Expansión y Compresión en la Cámara",
    conceptTitle: "Primera Ley de la Termodinámica",
    narrative: "Para impulsar la nave en el Módulo 3, Brayan diseña un motor de pistón cilíndrico de gas helio. Al calentar el compartimento con fuego termal, el gas ejerce presión hacia arriba empujando el pistón de escape.",
    concepts: [
      "Primera Ley (Conservación de la Energía): ΔU = Q - W (donde ΔU es cambio de energía interna, Q es calor añadido, y W es trabajo realizado).",
      "Trabajo expansivo (W > 0): El volumen aumenta, el gas actúa empujando contra el émbolo.",
      "Compresión (W < 0): Reducción de volumen por acción externa sobre el gas."
    ],
    prediction: {
      question: "Si introducimos calor Q a un gas sellado en un pistón rígido sin dejar que el volumen de la cámara aumente (volumen constante), ¿en qué se invertirá toda esa energía Q?",
      options: [
        "A) Se transforma enteramente en trabajo mecánico expansivo sin calentar el gas.",
        "B) Se conserva en forma de energía interna (ΔU) elevando directamente la temperatura de la cámara.",
        "C) El calor se desintegra cuánticamente de forma electromagnética.",
        "D) El gas disminuye su presión interna a cero."
      ],
      explanation: {
        "A": "Incorrecto. Sin cambio de volumen, no se efectúa trabajo mecánico exterior (W = 0).",
        "B": "¡Perfecto! Al ser a volumen constante (isocórico), el trabajo es cero, por lo cual toda la energía térmica aportada incrementa la energía molecular interna, subiendo la temperatura y presión.",
        "C": "Incorrecto. Se conserva la energía.",
        "D": "Incorrecto. La agitación del gas aumenta, elevando la presión física."
      }
    },
    saber11: {
      context: "Un cilindro que encierra un gas ideal recibe 1000 Joules de calor. Al expandirse, el gas realiza un trabajo útil de 400 Joules.",
      questionText: "¿Cuál es el cambio numérico neto experimentado por la energía interna (ΔU) del gas contenido en esta prueba?",
      options: [
        { key: "A", text: "ΔU = 1400 Joules." },
        { key: "B", text: "ΔU = 600 Joules, debido al balance energético de la primera ley de conservación (ΔU = Q - W)." },
        { key: "C", text: "ΔU = 400 Joules." },
        { key: "D", text: "ΔU = 0 Joules." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "Aplicando la Primera Ley de la Termodinámica (ΔU = Q - W), restamos el trabajo efectuado del calor total suministrado: ΔU = 1000 J - 400 J = 600 Joules. La respuesta correcta coincide con la opción B."
    },
    xpReward: 130,
    coinsReward: 40
  }
];

export const WAVES_LEVELS: Level[] = [
  {
    id: 25,
    title: "25. Detector Acústico: Agua vs Aire",
    conceptTitle: "Propagación del Sonido y Velocidad en Diferentes Medios",
    narrative: "En el sector acuático del Mundo 4, Brayan y Michell deben registrar las señales sonoras emitidas por bio-sondas submarinas. Para comprobar si la señal viaja sumergida en el agua o a través de la atmósfera exterior de aire, Alisson monitorea los sensores de longitud de onda, frecuencia y velocidad de propagación.",
    concepts: [
      "La frecuencia (f) de una onda depende exclusivamente de la fuente oscilante que la produce y NO cambia al trasladarse de un medio a otro.",
      "La velocidad de propagación (v) depende de las propiedades elásticas y de densidad del medio material.",
      "En el agua (líquido casi incompresible), el sonido viaja a aproximadamente 1.450 - 1.500 m/s.",
      "En el aire (gas compresible), el sonido viaja mucho más lento, a unos 340 m/s.",
      "Por la relación v = λ • f, al disminuir la velocidad en el aire manteniendo la frecuencia constante, la longitud de onda (λ) también disminuye."
    ],
    prediction: {
      question: "Si una onda acústica con frecuencia fija de 440 Hz pasa del agua salada al aire atmosférico, ¿qué magnitud física fundamental se conservará completamente invariable?",
      options: [
        "A) La velocidad de la onda.",
        "B) La frecuencia de la onda.",
        "C) La longitud de onda.",
        "D) La amplitud máxima de presión."
      ],
      explanation: {
        "A": "Incorrecto. La velocidad en el agua es ~1500 m/s y en el aire cae a ~340 m/s.",
        "B": "¡Excelente deducción! La frecuencia está determinada exclusivamente por la fuente que genera la vibración. Al cambiar de medio, la frecuencia se conserva constante.",
        "C": "Incorrecto. Como la velocidad cambia y la frecuencia permanece constante, la longitud de onda varía en proporción directa (λ = v/f).",
        "D": "Incorrecto. La amplitud disminuye por atenuación y reflexión en la frontera entre medios."
      }
    },
    saber11: {
      context: "Pregunta 2 de la prueba Saber 11:\nUn investigador sumerge un detector de sonido en agua para grabar los sonidos emitidos por los animales. El detector muestra la longitud de onda, la frecuencia, la velocidad de propagación y la distancia a la que se produce el sonido emitido por los animales. El investigador saca el detector del agua y registra un sonido.",
      questionText: "¿Cuál cambio de las variables mencionadas le permite asegurar al investigador que el sonido se trasmite por el aire y no por el agua?",
      options: [
        { key: "A", text: "La distancia de la onda." },
        { key: "B", text: "La frecuencia de la onda." },
        { key: "C", text: "La forma de la onda." },
        { key: "D", text: "La velocidad de la onda." }
      ],
      correctAnswer: "D",
      pedagogicalFeedback: "La velocidad de propagación de una onda mecánica como el sonido está determinada por las propiedades elásticas e inerciales del medio en el que se mueve. En el agua (medio denso e incompresible), la velocidad del sonido es de aproximadamente 1.450 a 1.500 m/s, mientras que en el aire desciende notablemente a unos 340 m/s. En cambio, la frecuencia de la onda se conserva constante porque solo depende de la fuente de origen. Por lo tanto, el cambio contundente en la velocidad de propagación de la onda le permite al investigador asegurar con certeza científica que el sonido se transmite por el aire y no por el agua. La opción correcta es la D."
    },
    xpReward: 130,
    coinsReward: 40
  },
  {
    id: 26,
    title: "26. Refracción en la Piscina: El Farol y el Nadador",
    conceptTitle: "Refracción de la Luz y Ley de Snell",
    narrative: "Para calibrar los escáneres ópticos del Extrover-1, Alisson simula una piscina de entrenamiento con un farol luminoso ubicado en el borde superior. Michell se sumerge en el fondo para registrar la trayectoria angular de los rayos de luz al cruzar del aire al agua.",
    concepts: [
      "Refracción: Es el cambio de dirección y velocidad que experimenta un rayo de luz al pasar oblicuamente de un medio transparente a otro con distinto índice de refracción (n).",
      "Índices de refracción: Aire (n_aire ≈ 1,0), Agua (n_agua ≈ 1,33).",
      "Ley de Snell: n1 • sin(θ1) = n2 • sin(θ2).",
      "Al pasar de un medio menos denso ópticamente (aire) a uno más denso (agua), el rayo se quiebra acercándose a la línea normal (vertical).",
      "El cerebro del observador proyecta la trayectoria visual en línea recta hacia atrás (imagen virtual), percibiendo el farol a mayor altura que su posición real."
    ],
    prediction: {
      question: "Cuando un rayo de luz viaja por el aire (n = 1,0) e incide con ángulo inclinado en el agua (n = 1,33), ¿hacia dónde se desvía el rayo refractado dentro del agua?",
      options: [
        "A) Se aleja de la normal hacia la superficie horizontal.",
        "B) Se acerca hacia la recta normal (vertical) a la superficie.",
        "C) Continúa exactamente en línea recta sin ninguna desviación.",
        "D) Se curva en espiral por la presión hidrostática."
      ],
      explanation: {
        "A": "Incorrecto. Se alejaría de la normal si pasara de un medio más denso a uno menos denso (del agua al aire).",
        "B": "¡Exacto! Al ingresar a un medio ópticamente más refringente donde la velocidad de la luz se reduce, el ángulo de refracción disminuye acercando el rayo a la normal.",
        "C": "Incorrecto. La diferencia de índices de refracción obliga a una desviación angular en incidencia oblicua.",
        "D": "Incorrecto. En medios homogéneos la propagación tras refractarse es rectilínea."
      }
    },
    saber11: {
      context: "Pregunta 3 de la prueba Saber 11:\nLos rayos de luz emitidos por objetos luminosos viajan en línea recta dentro de un mismo medio (ver figura 1). Si un rayo de luz pasa de aire a agua cambia su dirección como se muestra en la figura 2.\nCuando una piscina está vacía, un nadador observa el farol que está en el borde (ver figura 1); luego, cuando se llena la piscina (ver figura 2):",
      questionText: "El nadador verá el farol:",
      options: [
        { key: "A", text: "más bajo." },
        { key: "B", text: "a la misma altura." },
        { key: "C", text: "más alto." },
        { key: "D", text: "invertido." }
      ],
      correctAnswer: "C",
      pedagogicalFeedback: "Cuando la piscina está llena de agua, el rayo de luz procedente del farol en el aire (n ≈ 1,0) incide sobre la superficie y pasa al agua (n ≈ 1,33). Al pasar a un medio con mayor índice de refracción, la velocidad de la luz se reduce y el rayo se desvía acercándose a la recta normal (hacia la vertical). Al llegar al ojo del nadador sumergido en el fondo, el sistema visual del cerebro interpreta que la luz viaja siempre en línea recta, por lo que proyecta la imagen hacia atrás siguiendo la dirección del rayo que entra a sus ojos. Al prolongar en línea recta este rayo refractado, la intersección con la vertical del farol se ubica a una cota superior a la posición real del objeto. Por ende, el nadador sumergido ve el farol más alto. La opción correcta es la C."
    },
    xpReward: 135,
    coinsReward: 40
  },
  {
    id: 27,
    title: "27. Onda de Luz a Través de Vidrio y Agua",
    conceptTitle: "Longitud de Onda en Medios de Distinta Densidad",
    narrative: "En el laboratorio óptico de la nave, Brayan sostiene un vaso de vidrio que contiene agua. Alisson hace incidir un haz de luz monocromático que atraviesa de izquierda a derecha: aire exterior, la pared de vidrio, el agua contenida y finalmente sale de nuevo al aire.",
    concepts: [
      "Frecuencia (f): La frecuencia de la onda electromagnética es constante e invariable al cambiar de medio de propagación.",
      "Velocidad de la luz en el medio: v = c / n (donde c es la velocidad en el vacío y n es el índice de refracción).",
      "Longitud de onda en el medio: λ = v / f. Como f es constante, la longitud de onda es directamente proporcional a la velocidad en ese medio.",
      "Comportamiento por densidades según el problema:\n  • Aire (material menos denso): mayor velocidad y mayor longitud de onda (crestas más separadas).\n  • Vidrio (material más denso): menor velocidad y menor longitud de onda (crestas muy juntas / comprimidas).\n  • Agua (densidad intermedia): longitud de onda intermedia (más separada que en vidrio, pero menos que en aire).\n  • Al salir nuevamente al aire, la onda recupera su longitud de onda amplia original."
    ],
    prediction: {
      question: "Si una onda de luz con frecuencia constante pasa de un medio poco denso (aire) a uno más denso (vidrio) donde su velocidad se reduce, ¿qué le ocurre a la distancia entre dos crestas consecutivas (longitud de onda λ)?",
      options: [
        "A) La distancia entre crestas se reduce (la onda se comprime espacialmente).",
        "B) La distancia entre crestas se amplía al doble.",
        "C) La distancia entre crestas se mantiene idéntica.",
        "D) Las crestas se aplanan por completo hasta desaparecer."
      ],
      explanation: {
        "A": "¡Totalmente correcto! Como v = λ • f y la frecuencia f permanece fija, al reducirse la velocidad de propagación v en el vidrio, la longitud de onda λ disminuye necesariamente, comprimiendo las oscilaciones.",
        "B": "Incorrecto. Se ampliaría únicamente si la velocidad en el medio aumentara.",
        "C": "Incorrecto. La longitud de onda cambia en proporción directa a la velocidad en cada medio.",
        "D": "Incorrecto. La onda sigue oscilando sinusoidalmente."
      }
    },
    saber11: {
      context: "Pregunta 4 de la prueba Saber 11:\nUna onda de luz se mueve hacia un vaso de vidrio que contiene agua, como lo muestra la figura.\nSe espera que la longitud de onda de la luz sea menor en el vidrio (el material más denso), mayor en el aire (el material menos denso) y tenga un valor intermedio en el agua (el material más denso que el aire y menos denso que el vidrio).\nSi se pudiera ver el comportamiento de la onda al entrar en el vaso y salir de este:",
      questionText: "¿Cuál de las siguientes gráficas representa mejor la longitud de onda de luz en los tres materiales?",
      options: [
        { key: "A", text: "Gráfica A." },
        { key: "B", text: "Gráfica B." },
        { key: "C", text: "Gráfica C." },
        { key: "D", text: "Gráfica D." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "La longitud de onda λ representa la distancia entre dos crestas o puntos equivalentes de la oscilación. Como la frecuencia de la luz f permanece inalterable al propagarse por distintos medios, la longitud de onda es directamente proporcional a la velocidad de la luz en cada material (λ = v/f). Siguiendo las pautas del problema:\n1. En el aire inicial (menos denso), la longitud de onda es la mayor (oscilaciones amplias y separadas).\n2. Al ingresar al vidrio (el material más denso), la longitud de onda se vuelve la menor de todas (oscilaciones muy comprimidas y densas).\n3. Al ingresar al agua (densidad intermedia entre aire y vidrio), la longitud de onda adquiere un valor intermedio (más separada que en el vidrio, pero más junta que en el aire).\n4. Al emerger de nuevo al aire, recupera su longitud de onda mayor original.\nLa Gráfica B es la única representación que exhibe exactamente este patrón visual: aire (separadas) → vidrio (muy juntas) → agua (densidad media) → aire (separadas). Por lo tanto, la respuesta correcta es la opción B."
    },
    xpReward: 140,
    coinsReward: 40
  },
  {
    id: 28,
    title: "28. Campo Eléctrico y Carga Negativa",
    conceptTitle: "Líneas de Campo Eléctrico y Fuerza Electrostática",
    narrative: "Alisson y Brayan acceden a la cámara electrostática de alta tensión. Dos esferas cargadas generan un campo eléctrico E⃗ en el espacio: una esfera con carga positiva (+) a la izquierda y una esfera con carga negativa (-) a la derecha. Michell suspende en reposo una partícula con carga negativa -q dentro de las líneas de campo.",
    concepts: [
      "Líneas de campo eléctrico (E⃗): Nacen por convención en las fuentes de carga positiva (+) y mueren en las cargas negativas (-), orientadas de izquierda a derecha.",
      "Fuerza eléctrica sobre una carga puntual: F⃗ = q • E⃗.",
      "Si la carga es positiva (q > 0): El vector fuerza F⃗ apunta en el MISMO sentido que el campo eléctrico E⃗.",
      "Si la carga es negativa (q < 0, como -q): El vector fuerza F⃗ apunta en sentido OPUESTO al campo eléctrico E⃗ (F⃗ = -|q|E⃗).",
      "Interacción de Coulomb: La carga negativa -q es atraída hacia la esfera positiva (+) y repelida por la esfera negativa (-), acelerando hacia la izquierda a lo largo de la tangente a la línea de campo."
    ],
    prediction: {
      question: "Si en una zona donde las líneas de campo eléctrico E⃗ apuntan hacia la derecha se sitúa una partícula con carga negativa -q en reposo, ¿hacia dónde apunta la fuerza eléctrica resultante?",
      options: [
        "A) Hacia la derecha, acompañando el campo eléctrico.",
        "B) Hacia la izquierda, en sentido opuesto a las líneas de campo eléctrico.",
        "C) Hacia arriba perpendicularmente.",
        "D) La fuerza eléctrica es nula."
      ],
      explanation: {
        "A": "Incorrecto. Solo una carga positiva se mueve en el mismo sentido del campo eléctrico.",
        "B": "¡Perfecto! Por la ecuación F⃗ = q•E⃗, si la carga es negativa (q = -e), la fuerza tiene sentido contrario al vector de campo eléctrico: la partícula es atraída hacia el polo positivo.",
        "C": "Incorrecto. La fuerza electrostática es colineal a las líneas de campo eléctrico.",
        "D": "Incorrecto. Toda carga dentro de un campo eléctrico experimenta una fuerza electrostática no nula."
      }
    },
    saber11: {
      context: "Pregunta 5 de la prueba Saber 11 (Fenómenos Electromagnéticos):\nEn la figura se muestra un campo eléctrico E⃗, generado por dos esferas cargadas (esfera positiva + a la izquierda y esfera negativa - a la derecha); en el interior del campo eléctrico se coloca una carga negativa -q, tal como se muestra en la figura.",
      questionText: "De acuerdo con la información anterior, ¿cuál de las siguientes figuras muestra la dirección en la que se moverá la carga -q al ser liberada desde el reposo?",
      options: [
        { key: "A", text: "Gráfica A." },
        { key: "B", text: "Gráfica B." },
        { key: "C", text: "Gráfica C." },
        { key: "D", text: "Gráfica D." }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "Las líneas de campo eléctrico E⃗ parten de la esfera con carga positiva (+) a la izquierda y van hacia la esfera con carga negativa (-) a la derecha. La relación entre la fuerza electrostática experimentada por una partícula y el campo eléctrico está dada por la ecuación vectorial F⃗ = q·E⃗. Puesto que la partícula colocada tiene carga negativa (-q), el vector fuerza apunta en sentido opuesto al campo eléctrico (F⃗ = -|q|E⃗). En términos electrostáticos fundamentales, la partícula negativa es atraída por la esfera positiva de la izquierda y repelida por la esfera negativa de la derecha. Por lo tanto, al ser liberada desde el reposo, la carga -q experimentará una aceleración inicial tangente a la línea de campo orientada hacia abajo y a la izquierda (hacia la esfera positiva). Esta dirección corresponde de forma exacta a la flecha dibujada en la Gráfica A. La opción correcta es la A."
    },
    xpReward: 145,
    coinsReward: 45
  },
  {
    id: 29,
    title: "29. Fuerzas Electrostáticas sobre Tres Cargas",
    conceptTitle: "Ley de Coulomb y Principio de Superposición",
    narrative: "Para estabilizar el reactor de iones, Michell y Brayan disponen tres cargas en los vértices de una estructura triangular: la Carga 1 (negativa -) en el vértice superior, la Carga 2 (positiva +) en la base izquierda, y la Carga 3 (negativa -) en la base derecha. Los Extrovers deben diagramar los vectores de fuerza electrostática que actúan sobre la Carga 1.",
    concepts: [
      "Ley de Coulomb: Describe la magnitud de la fuerza entre cargas puntuales: F = k • |q_a • q_b| / r².",
      "Regla fundamental de signos:\n  • Cargas de igual signo (- con -, o + con +) experimentan fuerzas REPULSIVAS (se alejan entre sí a lo largo de la recta que las une).\n  • Cargas de signo contrario (+ con -) experimentan fuerzas ATRACTIVAS (se atraen hacia la otra carga a lo largo de la recta que las une).",
      "Interacción de Carga 2 (+) sobre Carga 1 (-):\n  Signos opuestos → Fuerza ATRACTIVA. El vector 'Fuerza de 2 sobre 1' apunta hacia abajo-izquierda, en dirección directa hacia la posición de la Carga 2.",
      "Interacción de Carga 3 (-) sobre Carga 1 (-):\n  Signos iguales → Fuerza REPULSIVA. El vector 'Fuerza de 3 sobre 1' apunta hacia arriba-izquierda, alejándose de la Carga 3 sobre la prolongación de la recta que las une."
    ],
    prediction: {
      question: "Si la Carga 1 es negativa (-) y la Carga 3 también es negativa (-), ¿en qué dirección apunta la fuerza eléctrica que la Carga 3 ejerce sobre la Carga 1?",
      options: [
        "A) Hacia la Carga 3, atrayéndola hacia el vértice inferior derecho.",
        "B) Alejándose de la Carga 3 en la prolongación de la recta diagonal (hacia arriba y a la izquierda), debido a la repulsión electrostática.",
        "C) Hacia el centro de la Tierra por gravedad cuántica.",
        "D) Es una fuerza circular rotacional."
      ],
      explanation: {
        "A": "Incorrecto. Se dirigiría hacia la carga 3 solo si tuviesen signos opuestos (atracción).",
        "B": "¡Brillante deducción! Dado que ambas cargas son negativas (- y -), la fuerza es puramente repulsiva; por tanto, la Carga 3 empuja a la Carga 1 alejándola en la línea de acción hacia arriba y a la izquierda.",
        "C": "Incorrecto. La ley de Coulomb actúa en la línea radial entre los centros de las cargas.",
        "D": "Incorrecto. Las fuerzas electrostáticas son centrales y radiales, no rotacionales."
      }
    },
    saber11: {
      context: "Pregunta 6 de la prueba Saber 11:\nDe la ley de Coulomb se sabe que la fuerza eléctrica debido a la interacción entre cargas de signos iguales es repulsiva y entre cargas de signos opuestos es atractiva.\nLa figura muestra un sistema conformado por tres cargas eléctricas en los vértices de un triángulo: Carga 1 en el vértice superior (signo negativo -), Carga 2 en la base izquierda (signo positivo +), y Carga 3 en la base derecha (signo negativo -).",
      questionText: "¿Cuál de las siguientes figuras muestra la fuerza eléctrica que ejercen la carga 2 y la carga 3 sobre la carga 1?",
      options: [
        { key: "A", text: "Gráfica A." },
        { key: "B", text: "Gráfica B." },
        { key: "C", text: "Gráfica C." },
        { key: "D", text: "Gráfica D." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "Para hallar las fuerzas que actúan sobre la Carga 1 (ubicada en el vértice superior con signo negativo -), analizamos por separado la interacción de cada carga vecina:\n1. Fuerza ejercida por la Carga 2 (+) sobre la Carga 1 (-): Como tienen signos opuestos (+ y -), la interacción es de atracción. Por consiguiente, la fuerza que 2 ejerce sobre 1 apunta hacia abajo y a la izquierda, dirigiéndose directamente hacia la Carga 2.\n2. Fuerza ejercida por la Carga 3 (-) sobre la Carga 1 (-): Como tienen signos iguales (- y -), la interacción es de repulsión. Por consiguiente, la Carga 3 empuja a la Carga 1 alejándola, es decir, el vector apunta hacia arriba y a la izquierda sobre la prolongación de la recta que conecta a ambas cargas.\nLa Gráfica B ilustra con perfecta exactitud ambos vectores: la 'Fuerza de 2 sobre 1' orientada hacia la Carga 2 (atractiva) y la 'Fuerza de 3 sobre 1' orientada alejándose de la Carga 3 (repulsiva). Por ende, la respuesta correcta es la opción B."
    },
    xpReward: 150,
    coinsReward: 45
  }
];

export const FLUIDS_THERMO_LEVELS: Level[] = [
  {
    id: 30,
    title: "30. Sublimación del Hielo Seco y Densidad",
    conceptTitle: "Cambios de Estado, Distancia Intermolecular y Densidad (d = m / V)",
    narrative: "Los Extrovers exploran el laboratorio criogénico de la nave. Alisson observa cómo un bloque de hielo seco (CO₂ sólido) se transforma directamente en gas bajo condiciones ambientales sin pasar por líquido (sublimación). Michell y Brayan analizan por qué disminuye la densidad del compuesto al cambiar de estado.",
    concepts: [
      "Definición de densidad: d = m / V (donde m es la masa y V es el volumen ocupado).",
      "Ley de Conservación de la Materia: En un cambio de estado físico, la masa total no se crea ni se destruye (la masa permanece constante).",
      "Estado sólido: Las moléculas de CO₂ están fuertemente empaquetadas en una red cristalina con mínima separación intermolecular y volumen reducido.",
      "Estado gaseoso: Las moléculas se dispersan ocupando todo el volumen disponible. La distancia intermolecular aumenta drásticamente y el volumen aumenta en varios órdenes de magnitud.",
      "Relación matemática: Como la masa (m) es constante y el volumen (V) aumenta, el cociente d = m / V disminuye."
    ],
    prediction: {
      question: "Cuando una sustancia sólida pasa a estado gaseoso en un recipiente cerrado flexible a presión ambiental, ¿qué le ocurre a su masa y a su volumen?",
      options: [
        "A) La masa disminuye y el volumen disminuye.",
        "B) La masa permanece constante mientras que el volumen aumenta significativamente por la separación entre partículas.",
        "C) La masa se duplica y el volumen se anula.",
        "D) Las partículas se destruyen liberando luz pura."
      ],
      explanation: {
        "A": "Incorrecto. La masa es una propiedad intrínseca que no se pierde durante un cambio físico de fase.",
        "B": "¡Exacto! La masa total de partículas de CO₂ se conserva intacta, pero las moléculas se separan ampliamente entre sí, aumentando el volumen global.",
        "C": "Incorrecto. La masa no se crea espontáneamente.",
        "D": "Incorrecto. En una transición de fase física las moléculas no se destruyen, únicamente cambian su ordenamiento espacial."
      }
    },
    saber11: {
      context: "Pregunta 1 de la prueba Saber 11 (Mecánica de Fluidos y Termodinámica):\nUn bloque de hielo seco, CO₂ sólido, cambia del estado sólido al gaseoso en condiciones ambientales. Este cambio de estado determina un cambio en la densidad del CO₂.",
      questionText: "Teniendo en cuenta la información anterior, tras el cambio de estado, la densidad del CO₂ disminuye porque",
      options: [
        { key: "A", text: "la masa de CO₂ disminuye." },
        { key: "B", text: "la distancia entre partículas y el volumen aumentan." },
        { key: "C", text: "la distancia entre partículas disminuye." },
        { key: "D", text: "la distancia entre partículas aumenta y la masa disminuye." }
      ],
      correctAnswer: "B",
      pedagogicalFeedback: "La densidad se define matemáticamente como d = m / V. Por el principio fundamental de conservación de la materia, durante un cambio de fase física (sublimación de sólido a gas) la masa (m) del CO₂ permanece rigurosamente constante (no disminuye). En el estado sólido, las partículas están muy próximas y ordenadas. Al pasar al estado gaseoso a temperatura ambiental, las fuerzas intermoleculares se debilitan y las partículas se separan ampliamente (la distancia intermolecular aumenta), provocando un gran aumento del volumen (V). Dado que la masa m es constante y el volumen V aumenta, el cociente m/V disminuye, reduciendo la densidad. Por ende, la respuesta correcta es la opción B."
    },
    xpReward: 140,
    coinsReward: 40
  },
  {
    id: 31,
    title: "31. Punto de Ebullición y Presión Atmosférica",
    conceptTitle: "Presión Atmosférica según la Altura y Presión de Vapor",
    narrative: "Para preparar una infusión energética en la estación estratosférica, Michell calienta agua a 25 km de altitud. Brayan recuerda que a nivel del mar (0 km) el agua hierve a 100 °C, pero el modelo holográfico de partículas de aire muestra que en la alta atmósfera la densidad de aire es casi nula.",
    concepts: [
      "Punto de ebullición: Es la temperatura a la cual la presión de vapor del líquido iguala la presión atmosférica circundante.",
      "Variación de la presión con la altura: A mayor altura sobre el nivel del mar, menor es la columna de aire suprayacente y menor es la concentración de moléculas gaseosas; por tanto, la presión atmosférica disminuye.",
      "Efecto en la ebullición: Al ser menor la presión externa que empuja la superficie libre del líquido, las moléculas de agua requieren menor agitación térmica (menor temperatura) para que su presión de vapor iguale a la presión atmosférica y comience a hervir.",
      "A 0 km (nivel del mar, 1 atm de presión), el agua hierve a 100 °C.",
      "A 25 km de altura (presión atmosférica extremadamente baja), el agua hierve a una temperatura significativamente menor que 100 °C."
    ],
    prediction: {
      question: "Si cocinamos en la cima de una montaña muy alta donde la presión atmosférica es mucho menor que en la costa, ¿a qué temperatura hervirá el agua?",
      options: [
        "A) A más de 100 °C porque el frío ambiente exige más calor.",
        "B) A menos de 100 °C porque se requiere menor presión de vapor para igualar la reducida presión exterior.",
        "C) El agua nunca podrá hervir sin importar el calor suministrado.",
        "D) Exactamente a 100 °C en cualquier rincón del universo."
      ],
      explanation: {
        "A": "Incorrecto. Una menor presión externa facilita la ebullición, no la dificulta.",
        "B": "¡Brillante! Menor presión atmosférica significa que las burbujas de vapor pueden formarse y escapar a menor temperatura, por debajo de 100 °C.",
        "C": "Incorrecto. El agua hierve siempre que la presión de vapor iguale la presión ambiente.",
        "D": "Incorrecto. 100 °C es el punto de ebullición normal estándar a 1 atmósfera de presión (nivel del mar)."
      }
    },
    saber11: {
      context: "Pregunta 2 de la prueba Saber 11 (Mecánica de Fluidos y Termodinámica):\nEl modelo representa la relación entre la altura y la cantidad de partículas de aire (mostrando una disminución progresiva y drástica de partículas a medida que la altura sube de 0 km a 30 km).\nUna olla con agua hierve a una temperatura de 100 °C, cuando la altura es 0 km. Teniendo en cuenta que el punto de ebullición corresponde a la temperatura a la cual la presión de vapor del gas iguala la presión atmosférica, si se pone a calentar la misma cantidad de agua a una altura de 25 km, puede afirmarse que el agua",
      questionText: "¿Qué afirmación describe correctamente el comportamiento del agua al calentarse a 25 km de altura?",
      options: [
        { key: "A", text: "hierve a una temperatura menor que 100 °C, porque la presión es menor en esta altura." },
        { key: "B", text: "hierve a una temperatura mayor que 100 °C, porque la presión es menor en esta altura." },
        { key: "C", text: "nunca hierve, porque en esta altura hay muy poca cantidad de aire." },
        { key: "D", text: "se congela, porque al no haber aire el agua pasará a estado sólido." }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "El punto de ebullición se define como la temperatura en la cual la presión de vapor del líquido iguala la presión atmosférica externa. Según el modelo provisto, al ascender a 25 km de altitud, la cantidad de partículas de aire disminuye radicalmente, lo que ocasiona que la presión atmosférica sea muy inferior a la del nivel del mar (0 km). Como la presión externa que se opone a la vaporización es mucho menor, el agua necesita menor energía térmica para que su presión de vapor la iguale. Por lo tanto, el agua hierve a una temperatura menor que 100 °C. La opción correcta es la A."
    },
    xpReward: 145,
    coinsReward: 45
  },
  {
    id: 32,
    title: "32. Análisis Gráfico y Línea de Tendencia",
    conceptTitle: "Extrapolación Experimental e Intercepto (Masa vs Densidad)",
    narrative: "Un equipo de estudiantes sumerge una esponja en líquidos de distinta densidad y registra la masa total resultante. Brayan y Alisson examinan la gráfica experimental con sus puntos medidos y su línea de tendencia para evaluar una hipótesis sobre densidades cercanas a cero.",
    concepts: [
      "Línea de tendencia: Es una función matemática (regresión o ajuste lineal) que resume la correlación entre variables y permite predecir valores mediante extrapolación.",
      "Masa total registrada: Corresponde a la suma de la masa de la esponja seca más la masa del líquido absorbido en sus poros (M_total = m_esponja + m_líquido).",
      "Intercepto en el eje Y (ordenada al origen): Al extrapolar la línea de tendencia hacia un líquido de densidad extremadamente baja (densidad tendiendo a cero), la masa registrada no es cero, sino que corta el eje en un valor positivo (aproximadamente entre 8 y 10 gramos), que es la masa intrínseca de la esponja seca.",
      "Validez de predicción: Afirmar que para densidades muy bajas la masa será diferente de cero sí es una predicción científica sustentada en los datos, fundamentada en que la línea de tendencia cruza en un punto diferente de cero."
    ],
    prediction: {
      question: "En un gráfico experimental de Y vs X, ¿qué significado físico y metodológico tiene el punto donde la línea de tendencia cruza el eje vertical Y (cuando X = 0)?",
      options: [
        "A) Es un error instrumental que debe borrarse.",
        "B) Es el intercepto con el eje, que predice el valor basal de la variable dependiente Y cuando la variable independiente X es nula.",
        "C) Siempre debe ser exactamente cero en cualquier experimento de física.",
        "D) Representa la velocidad terminal de la gravedad."
      ],
      explanation: {
        "A": "Incorrecto. El intercepto es un parámetro matemático fundamental del modelo lineal y = mx + b.",
        "B": "¡Excelente! El intercepto 'b' representa el valor esperado de la variable medida cuando la variable del eje X es cero (en este caso, la masa de la esponja sin líquido absorbido).",
        "C": "Incorrecto. Muchos fenómenos físicos poseen valores base no nulos cuando la variable de control es cero.",
        "D": "Incorrecto. No tiene relación con la velocidad terminal."
      }
    },
    saber11: {
      context: "Pregunta 3 de la prueba Saber 11 (Mecánica de Fluidos y Termodinámica):\nUn grupo de estudiantes realizó un experimento que consistía en sumergir una esponja en líquidos de diferente densidad, para luego medir su volumen y masa. En la gráfica se presentan los resultados de este experimento marcados con puntos, y una línea de tendencia (mostrando una recta creciente que corta el eje vertical de Masa en aproximadamente 8 g para Densidad = 0 g/cm³).\nUn estudiante afirma que, si se usa un líquido con una densidad extremadamente baja, la masa registrada será diferente de cero.",
      questionText: "¿Esta afirmación puede considerarse una predicción basada en los datos experimentales?",
      options: [
        { key: "A", text: "Sí, porque la línea de tendencia cruza en un punto diferente de cero." },
        { key: "B", text: "No, porque no se observa ningún patrón entre la densidad y la masa." },
        { key: "C", text: "No, porque no existen datos que usen líquidos con muy baja densidad." },
        { key: "D", text: "Sí, porque todos los datos presentan masas diferentes de cero." }
      ],
      correctAnswer: "A",
      pedagogicalFeedback: "Una línea de tendencia en un reporte experimental representa un modelo predictivo que ajusta los datos observados. Al seguir visual y analíticamente la recta hacia la izquierda (extrapolación hacia valores de densidad muy cercanos a cero), se observa claramente que la línea de tendencia no pasa por el origen (0,0), sino que intersecta el eje vertical de la Masa en un valor positivo (alrededor de 8 g). Físicamente, este valor basal representa la masa propia de la esponja seca en ausencia de líquido. Por lo tanto, la afirmación sí puede considerarse una predicción válida fundamentada en que la línea de tendencia cruza en un punto diferente de cero. La opción correcta es la A."
    },
    xpReward: 150,
    coinsReward: 45
  },
  {
    id: 33,
    title: "33. Presión en Gases Ideales y Émbolo Sellado",
    conceptTitle: "Ley de Boyle (P1·V1 = P2·V2) y Equilibrio Mecánico",
    narrative: "En la esclusa de despresurización, Alisson toma una jeringa cilíndrica de área transversal A con su émbolo ubicado a una distancia d de la base. El ambiente se encuentra a temperatura T y presión atmosférica P. Tras sellar herméticamente la boquilla inferior, Michell desplaza el émbolo hacia arriba una distancia adicional X y pregunta qué ocurrirá al soltarlo.",
    concepts: [
      "Ley de Boyle (Gas ideal a temperatura constante T): P · V = constante. La presión del gas es inversamente proporcional a su volumen.",
      "Volumen inicial: V_inicial = A · d. Como la jeringa se selló a presión atmosférica P, la presión interna inicial del gas es P_gas = P.",
      "Desplazamiento hacia arriba (+X): El nuevo volumen del gas atrapado aumenta a V_nuevo = A · (d + X).",
      "Disminución de presión interna: Al aumentar el volumen ocupado por el gas sin entrada de aire exterior, la nueva presión interna disminuye: P_gas < P.",
      "Equilibrio de fuerzas sobre el émbolo al soltarlo:\n  • Fuerza hacia abajo por presión atmosférica externa: F_ext = P · A.\n  • Fuerza hacia arriba por presión interna del gas: F_int = P_gas · A.\n  • Como P_gas < P, la fuerza externa descendente es mayor (F_ext > F_int), empujando el émbolo de retorno a su posición inicial d."
    ],
    prediction: {
      question: "Si tienes una jeringa con aire y la punta sellada herméticamente, ¿qué sucede si tiras del émbolo hacia afuera aumentando el volumen y luego retiras la mano?",
      options: [
        "A) El émbolo se queda quieto donde lo dejaste.",
        "B) El émbolo sale disparado hacia afuera expulsado por el vacío.",
        "C) El émbolo regresa hacia adentro a su posición original debido a que la presión atmosférica exterior supera a la presión reducida interna.",
        "D) La jeringa se calienta hasta fundirse instantáneamente."
      ],
      explanation: {
        "A": "Incorrecto. Solo se quedaría si la presión interna igualara a la externa.",
        "B": "Incorrecto. El vacío o baja presión no empuja hacia afuera, sino que no puede contrarrestar la presión exterior.",
        "C": "¡Exacto! Al expandir el aire atrapado su presión cae por debajo de la atmosférica; la atmósfera exterior empuja el émbolo de regreso al punto de equilibrio.",
        "D": "Incorrecto. Es un proceso de expansión mecánica isotérmica ordinaria."
      }
    },
    saber11: {
      context: "Pregunta 4 de la prueba Saber 11 (Mecánica de Fluidos y Termodinámica):\nSe toma una jeringa de área transversal A y se mueve su émbolo hacia arriba una distancia d. La temperatura del lugar es T y P la presión atmosférica. Luego se sella la punta de la jeringa. Considere el aire en el interior de la jeringa como un gas ideal y desprecie cualquier fricción.\nSi a partir de la posición indicada en la figura, el émbolo se desplaza hacia arriba una distancia X y se suelta, sucederá que el émbolo:",
      questionText: "¿Qué le sucederá al émbolo al ser soltado desde la nueva posición desplazada hacia arriba una distancia X?",
      options: [
        { key: "A", text: "se quedará en la nueva posición, porque la nueva presión del gas es mayor que P." },
        { key: "B", text: "se quedará en la nueva posición, porque la presión del gas sigue siendo P." },
        { key: "C", text: "retornará a la posición inicial, porque la presión del gas sigue siendo P." },
        { key: "D", text: "retornará a la posición inicial, porque la nueva presión del gas es menor que P." }
      ],
      correctAnswer: "D",
      pedagogicalFeedback: "Al sellar la punta de la jeringa en la posición d, el gas atrapado se halla a la presión atmosférica P. Al jalar el émbolo hacia arriba una distancia adicional X, el volumen del gas aumenta de V1 = A·d a V2 = A·(d+X). De acuerdo con la Ley de Boyle para un gas ideal a temperatura constante (P1·V1 = P2·V2), al incrementarse el volumen, la presión interna del gas necesariamente disminuye, resultando P_gas < P. Sobre el émbolo actúan dos fuerzas principales: la fuerza hacia abajo ejercida por la atmósfera (F_ext = P·A) y la fuerza hacia arriba ejercida por el gas confinado (F_int = P_gas·A). Dado que P_gas < P, la fuerza externa hacia abajo es estrictamente mayor que la interna, obligando al émbolo a retornar a la posición inicial hasta restablecer el equilibrio donde las presiones se igualan. Por lo tanto, la opción correcta es la D."
    },
    xpReward: 155,
    coinsReward: 50
  },
  {
    id: 34,
    title: "34. Ascenso del Submarino y Principio de Arquímedes",
    conceptTitle: "Fuerza de Empuje (E = ρ·g·V_sum), Peso (W = m·g) y Fuerza Neta",
    narrative: "El Extrover-1 sobrevuela el océano de un planeta acuático donde una sonda submarina se encuentra a profundidad h en flotabilidad neutra. Para ascender hacia la superficie, la tripulación activa las bombas para expulsar parte del agua acumulada en sus tanques de lastre. Brayan, Michell y Alisson debaten sobre cómo varían el empuje, el peso y la fuerza neta.",
    concepts: [
      "Principio de Arquímedes: Todo cuerpo total o parcialmente sumergido en un fluido experimenta un empuje vertical hacia arriba igual al peso del volumen de fluido desalojado: E = ρ_fluido · g · V_sumergido.",
      "Volumen sumergido constante: Como el submarino ya se encuentra totalmente sumergido a profundidad h, su volumen exterior sumergido no cambia al bombear agua interna; por lo tanto, el empuje hidrostático E permanece CONSTANTE.",
      "Disminución de masa y peso: Al bombear agua hacia el exterior, la masa total del sistema disminuye y consecuentemente su peso (W = m · g) disminuye.",
      "Fuerza neta ascendente: Inicialmente en reposo o equilibrio, W = E. Al expulsar agua, el peso se hace menor que el empuje (W < E), por lo que la fuerza neta vertical (F_neta = E - W) apunta hacia arriba, impulsando el ascenso del submarino.",
      "Evaluación de afirmaciones:\n  • Estudiante 1 afirma que el empuje aumenta → INCORRECTO (el empuje no cambia).\n  • Estudiante 2 afirma que el empuje aumenta y el peso disminuye → INCORRECTO (el empuje no aumenta).\n  • Estudiante 3 afirma que la fuerza neta está orientada hacia arriba → CORRECTO."
    ],
    prediction: {
      question: "Si un submarino completamente sumergido expulsa agua de sus tanques internos reemplazándola con aire a presión, ¿qué ocurre con la fuerza de empuje que el agua ejerce sobre el casco exterior del submarino?",
      options: [
        "A) El empuje se multiplica por diez.",
        "B) El empuje permanece igual (constante), porque el volumen exterior del submarino bajo el agua sigue siendo exactamente el mismo.",
        "C) El empuje disminuye a cero.",
        "D) El empuje se invierte apuntando hacia el fondo marino."
      ],
      explanation: {
        "A": "Incorrecto. El empuje depende únicamente del volumen exterior desplazado y la densidad del agua.",
        "B": "¡Perfecto! El Principio de Arquímedes establece E = ρ·g·V_sum. Como el casco del submarino no se agranda ni se encoge, el volumen desplazado es idéntico y el empuje se mantiene constante.",
        "C": "Incorrecto. Mientras permanezca en el agua, el empuje hidrostático sigue actuando con idéntica magnitud.",
        "D": "Incorrecto. El empuje hidrostático siempre tiene sentido vertical ascendente."
      }
    },
    saber11: {
      context: "Pregunta 5 de la prueba Saber 11 (Mecánica de Fluidos y Termodinámica):\nUn submarino se encuentra a una profundidad h. Para ascender bombea al exterior parte del agua acumulada en sus tanques. Tres estudiantes afirman que:\nEstudiante 1: El submarino asciende, porque el empuje aumenta.\nEstudiante 2: El submarino asciende, porque el empuje aumenta y el peso disminuye.\nEstudiante 3: El submarino asciende, porque la fuerza neta está orientada hacia arriba.",
      questionText: "¿Los estudiantes que hacen afirmaciones correctas son?",
      options: [
        { key: "A", text: "los estudiantes 1 y 2." },
        { key: "B", text: "los tres estudiantes." },
        { key: "C", text: "sólo el estudiante 3." },
        { key: "D", text: "sólo el estudiante 2." }
      ],
      correctAnswer: "C",
      pedagogicalFeedback: "Por el Principio de Arquímedes, la fuerza de empuje hidrostático vertical hacia arriba está dada por E = ρ_agua · g · V_sumergido. Puesto que el submarino ya se encuentra totalmente sumergido a profundidad h, su volumen exterior es constante y no sufre ninguna alteración cuando bombea agua de sus tanques internos al exterior. En consecuencia, el empuje hidrostático E permanece completamente constante (no aumenta). Lo que realmente ocurre al expulsar agua al exterior es que se reduce la masa total del submarino, disminuyendo su peso W = m·g. Al ser ahora el peso menor que el empuje constante (W < E), la fuerza resultante o fuerza neta vertical (F_neta = E - W) queda orientada hacia arriba, haciendo ascender al submarino. Por consiguiente, los estudiantes 1 y 2 se equivocan al afirmar que el empuje aumenta, y únicamente el estudiante 3 hace una afirmación correcta. La opción correcta es la C."
    },
    xpReward: 160,
    coinsReward: 50
  }
];

export const getLevelsByModuleId = (moduleId: number): Level[] => {
  switch (moduleId) {
    case 1:
      return KINEMATICS_LEVELS;
    case 2:
      return DYNAMICS_LEVELS;
    case 3:
      return THERMODYNAMICS_LEVELS;
    case 4:
      return WAVES_LEVELS;
    case 5:
      return FLUIDS_THERMO_LEVELS;
    default:
      return KINEMATICS_LEVELS;
  }
};

export const OTHER_MODULES = [
  {
    id: 1,
    name: "Módulo 1: Cinemática",
    codeName: "cinematica",
    description: "Estudio del movimiento físico sin considerar las causas que lo motivan.",
    totalLevels: 10,
    icon: "Activity",
    isActive: true
  },
  {
    id: 2,
    name: "Módulo 2: La Fuerza del Guerrero",
    codeName: "dinamica",
    description: "Entrenamiento de combate físico aplicando conceptos de cinemática y leyes dinámicas.",
    totalLevels: 6,
    icon: "Zap",
    isActive: true
  },
  {
    id: 3,
    name: "Módulo 3: Termodinámica y Energía",
    codeName: "termodinamica",
    description: "Conservación de la energía mecánica, potencial, cinética, transformaciones y calor.",
    totalLevels: 8,
    icon: "Flame",
    isActive: true
  },
  {
    id: 4,
    name: "Módulo 4: Fenómenos Ondulatorios y Electromagnéticos",
    codeName: "ondas",
    description: "Propagación acústica, velocidad en medios, refracción óptica, campo eléctrico y ley de Coulomb.",
    totalLevels: 5,
    icon: "Waves",
    isActive: true
  },
  {
    id: 5,
    name: "Módulo 5: Mecánica de Fluidos y Termodinámica",
    codeName: "fluidos_termodinamica",
    description: "Densidad, cambios de estado, punto de ebullición y altura, ajuste lineal de datos, ley de Boyle y empuje de Arquímedes.",
    totalLevels: 5,
    icon: "Droplets",
    isActive: true
  }
];
