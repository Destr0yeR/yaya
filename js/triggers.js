var triggers_map = [
//0 TEST
[
	[0			,0			,DoorUp		,0			,DoorUp		,0			,0			,0		],
	[DoorLeft	,0			,0			,Ekeko		,0			,0			,0			,DoorRight	],
	[0			,0			,0			,0			,0			,Kero		,0			,0		],
	[0			,0			,Picture	,0			,0			,0			,0			,0		],
	[0			,Vicuna		,0			,Luna		,0			,0			,Picture	,0		],
	[0			,0			,0			,0			,0			,DoorDown	,0			,0		]
]
,
//1 NADA
[
	[0		,0			,0			,DoorUp		,0		,0		,0			,0		],
	[0		,Casco	,0			,0			,0		,0		,0			,0		],
	[0		,0			,0			,0			,0		,Caballo		,0			,0		],
	[0		,0			,Pistola	,0			,0		,0		,0	 		,0		],
	[0		,0			,0			,0			,0		,0		,Mapa	,0		],
	[0		,0			,0			,0			,0		,0		,0			,0		]
]
,
//2 ACERTIJO
[
	[0			,0		,0		,DoorUp		,0		,0		,0		,0		],
	[Picture	,Tumi		,0	  	,0			,0		,0		,0		,0		],
	[0			,0		,0		,0			,0		,0		,0		,Picture],
	[0			,0		,0		,0			,0		,0		,0		,0		],
	[0			,Chakana		,0		,0			,0		,Kero		,0		,0		],
	[0			,0		,0		,DoorDown	,0		,0		,0		,0		]
]
,
//3 NADA
[
	[0		,0		,0		,0		,0		,0		,0		,0		],
	[0		,Sarcofago		,0		,0		,0		,0		,0		,0		],
	[0		,0		,0		,0		,0		,0		,0		,DoorRight	],
	[0		,0		,0		,0		,0		,0		,0		,0		],
	[0		,0		,0		,0		,0		,0		,0		,0		],
	[0		,0		,0		,0		,0		,0		,0		,0		]
]
,
//4 NADA
[
	[0			,0		,0		,DoorUp		,0		,0		,0		,0		],
	[0			,0		,0		,0			,0		,Caballo		,0		,0		],
	[DoorLeft	,Casco		,0		,0			,0		,0		,0		,DoorRight	],
	[0			,0		,0		,0			,0		,0		,0		,0		],
	[0			,0		,Pistola		,0			,0		,Mapa		,0		,0		],
	[0			,0		,0		,DoorDown	,0		,0		,0		,0		]
]
,
//5 ACERTIJO
[
	[0			,0		,0		,0			,0		,0		,0		,0		],
	[0			,Alpaca		,0		,0			,0		,Vicuna		,0		,0		],
	[DoorLeft	,0		,0		,0			,0		,0		,0		,0		],
	[0			,0		,0		,Llama	,0		,0		,0		,0		],
	[0			,0		,0		,0			,0		,0		,0		,0		],
	[0			,0		,0		,0			,0		,0		,0		,0		]
]
, 
//6 ACERTIJO
[
	[0		,0		,0		,DoorUp		,0		,0		,0		,0		],
	[0		,Papa		,0		,0			,0		,0		,Maiz		,0		],
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,Quinua		,0		,0			,0		,Chirimoya		,0		,0		],
	[0		,0		,0		,DoorDown	,0		,0		,0		,0		]
]
,
//7 ACERTIJO
[
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,Bota		,0		,0			,0		,Caballo		,0		,0		],
	[0		,0		,0		,0			,0		,0		,0		,DoorRight	],
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,0		,Sombrero		,0			,0		,Bala		,0		,0		],
	[0		,0		,0		,DoorDown	,0		,0		,0		,0		]
]
,
//8 NADA
[
	[0			,0		,0		,DoorUp		,0		,0		,0		,0		],
	[0			,0		,0		,0			,CabezaClava		,0		,0		,0		],
	[DoorLeft	,0		,0		,0			,0		,0		,0		,DoorRight 	],
	[0			,0		,0		,0			,0		,0		,0		,0		],
	[0			,0		,LineaNazca		,0			,0		,PortadaSol		,0		,0		],
	[0			,0		,0		,0			,0		,0		,0		,0		]
]
, 
//9 ACERTIJO
[
	[0			,0		,0		,0		,0		,0		,0		,0		],
	[0			,0		,Luna		,0		,0		,0		,Tierra		,0		],
	[DoorLeft	,0		,0		,0		,0		,0		,0		,0		],
	[0			,0		,0		,0		,0		,0		,0		,0		],
	[0			,Estrella		,0		,0		,Sol		,0		,0		,0		],
	[0			,0		,0		,0		,0		,0		,0		,0		]
]
,
//10 NADA
[
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,0		,0		,0			,0		,0		,0		,0		],
	[0		,0		,0		,DoorDown	,0		,0		,0		,0		]
]];
