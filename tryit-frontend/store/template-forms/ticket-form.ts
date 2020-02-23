import { FormType, StatusOnInput } from "~/types/components"

// Default status
const status: StatusOnInput = {
	status: "",
	statusDetail: {
		message: "",
		abbreviation: ""
	}
}
export const ticketForm: FormType = {
	title: "Consigue tu entrada",
	description: "TODO",
	formModule: "ticket",
	sections: [
		{
			title: "Información personal",
			description:
				"Usaremos esta información para poder enviarte el ticket y para poder convalidarte los créditos",
			inputs: [
				{
					tag: "text-input",
					properties: {
						placeholder: "Nombre",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "1",
					requirements: ["string-not-empty", "only-letters"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "Apellidos",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "2",
					requirements: ["string-not-empty", "only-letters"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "DNI / NIE",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "3",
					requirements: ["string-not-empty", "is-person-id"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "Email",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "4",
					requirements: ["string-not-empty", "is-email"]
				},
				{
					tag: "text-input",
					properties: {
						placeholder: "Teléfono",
						helperText: "Obligatorio",
						status
					},
					value: "",
					id: "5",
					requirements: ["string-not-empty", "is-phone"]
				}
			]
		},
		{
			title: "Información universitaria",
			description:
				"Queremos conocerte un poquito más. Estos datos nos sirven para tener estadísticas y poder ofrecer mejores congresos en el futuro.",
			inputs: [
				{
					tag: "student-input",
					properties: {},
					value: {
						isStudent: true,
						isUpmStudent: true
					},
					id: "student-input",
					requirements: []
				},
				{
					tag: "select-input",
					question: "¿En qué Escuela estudias?",
					properties: {
						options: [],
						selected: "10",
						oldSelected: "10",
						open: false
					},
					value: "",
					id: "schools-selection",
					requirements: [],
					requires: [
						{
							id: "student-input",
							value: {
								isStudent: true,
								isUpmStudent: true
							}
						}
					]
				},
				{
					tag: "select-input",
					question: "¿Que titulación?",
					properties: {
						options: [
							[
								{
									title: "Ingería informatica",
									id: "10"
								}
							]
						],
						selected: "10",
						oldSelected: "10",
						open: false
					},
					id: "8",
					value: "degrees-selection",
					requirements: [],
					requires: [
						{
							id: "student-input",
							value: {
								isStudent: true,
								isUpmStudent: true
							}
						}
					]
				},
				{
					tag: "labels-input",
					question: "¿Que curso estudias?",
					properties: {
						options: [
							{
								title: "1",
								id: "1"
							},
							{
								title: "2",
								id: "2"
							},
							{
								title: "3",
								id: "3"
							},
							{
								title: "4",
								id: "4"
							},
							{
								title: "5",
								id: "5"
							},
							{
								title: "6",
								id: "6"
							}
						],
						selected: 1
					},
					id: "9",
					value: "",
					requirements: [],
					requires: [
						{
							id: "student-input",
							value: {
								isStudent: true,
								isUpmStudent: true
							}
						}
					]
				}
			]
		},
		{
			title: "Una última cosa...",
			inputs: [
				{
					tag: "checkbox-detail",
					properties: {
						text:
							"El usuario concede a la organización el derecho de uso de las imágenes tomadas durante el evento para su posible uso en redes sociales y página web.",
						checked: false,
						htmlId: "ticket-conditions"
					},
					id: "10",
					value: false,
					requirements: []
				}
			]
		}
	]
}
