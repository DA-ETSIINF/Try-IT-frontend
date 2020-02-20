import {
	StatusOnInput,
	Requirement,
	StatusDetailOnInput,
	Indexes,
	InputStatus,
	DynamicFormModule
} from "~/types/components"
import { TicketModule } from "../store/ticket"
import { VolunteerModule } from "../store/volunteer"

const INPUTS_ERRORS = {
	notEmpty: {
		message: "Este campo no puede estar vacío",
		abbreviation: "field_cannot_be_empty"
	},
	isOnlyLetters: {
		message: "Sólo puede contener letras",
		abbreviation: "just_letters"
	},
	isPersonId: {
		incorrectFormat: {
			message: "Esto no está bien, recuerda que debe tener una letra",
			abbreviation: "not_contains_letters"
		},
		invalidLetter: {
			message: "Comprueba el {{type}}",
			abbreviation: "invalid_letter"
		}
	},
	invalidEmail: {
		message: "Comprueba el email",
		abbreviation: "invalid_email"
	},
	invalidPhone: {
		message: "Comprueba el número de telefóno",
		abbreviation: "invalid_phone"
	}
}

function generateResponse(
	status: InputStatus,
	statusDetail: StatusDetailOnInput | undefined = undefined
): StatusOnInput {
	if (status === "ok" || !statusDetail) {
		statusDetail = { message: "", abbreviation: "" }
	}

	return {
		status,
		statusDetail
	}
}

export function isOnlyLetters(str: string): StatusOnInput {
	// Allow alphabets and accented characters
	const re = /^[a-zA-Z\u00C0-\u00FF]*$/
	const isJustLetteres = re.test(str.toLowerCase())
	return generateResponse(isJustLetteres ? "ok" : "error", INPUTS_ERRORS.isOnlyLetters)
}

export function notEmpty(str: string): StatusOnInput {
	const containsErrors = str.length > 0
	return generateResponse(containsErrors ? "ok" : "error", INPUTS_ERRORS.notEmpty)
}

export function isPersonId(_str: string): StatusOnInput {
	const str = _str.toUpperCase()

	const validChars = "TRWAGMYFPDXBNJZSQVHLCKET"
	const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
	const nieRegex = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i

	if (!nifRegex.test(str) && !nieRegex.test(str)) {
		return generateResponse("error", INPUTS_ERRORS.isPersonId.incorrectFormat)
	}

	const nie = str
		.replace(/^[X]/, "0")
		.replace(/^[Y]/, "1")
		.replace(/^[Z]/, "2")

	const letter = str.substr(-1)
	const charIndex = parseInt(nie.substr(0, 8)) % 23

	if (validChars.charAt(charIndex) === letter) {
		return generateResponse("ok")
	} else {
		let personIdType = str[0] === "X" || str[0] === "X" || str[0] === "X" ? "NIE" : "DNI"
		const e = {
			...INPUTS_ERRORS.isPersonId.invalidLetter,
			message: INPUTS_ERRORS.isPersonId.invalidLetter.message.replace("{{type}}", personIdType)
		}
		return generateResponse("error", e)
	}
}

export function isEmail(str: string) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const isEmail = re.test(str.toLowerCase())
	return generateResponse(isEmail ? "ok" : "error", INPUTS_ERRORS.invalidEmail)
}

export function isPhone(phone: string) {
	const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
	const isPhone = re.test(phone.toLowerCase())
	return generateResponse(isPhone ? "ok" : "error", INPUTS_ERRORS.invalidPhone)
}

export function validate(
	requirements: Requirement[],
	str: string,
	indexes: Indexes,
	formModule: DynamicFormModule
): boolean {
	for (let i = 0; i < requirements.length; i++) {
		const r = requirements[i]
		let status: StatusOnInput
		switch (r) {
			case "not-empty":
				status = notEmpty(str)
				break
			case "only-letters":
				status = isOnlyLetters(str)
				break
			case "is-person-id":
				status = isPersonId(str)
				break
			case "is-email":
				status = isEmail(str)
				break
			case "is-phone":
				status = isPhone(str)
				break
		}
		switch (formModule) {
			case "ticket":
				TicketModule.updateErrorOnInput({
					indexes,
					status
				})
				break
			case "volunteer":
				VolunteerModule.updateErrorOnInput({
					indexes,
					status
				})
				break
		}

		if (status.status !== "ok") {
			return false
		}
	}
	return true
}
