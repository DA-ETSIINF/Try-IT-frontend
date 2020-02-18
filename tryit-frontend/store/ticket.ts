import { Module, Mutation, VuexModule, getModule } from "vuex-module-decorators"
import { TicketResource } from "~/types"
import { FormType, TextInputType } from "~/types/components"
import { ticketForm as tf } from "./template-forms"
import { store } from "~/store"

@Module({ dynamic: true, store, name: "ticket", stateFactory: true, namespaced: true })
export default class Ticket extends VuexModule {
	ticket!: TicketResource
	ticketForm: FormType = tf

	get getTitle(): string | undefined {
		return this.ticketForm.title
	}

	get getDescription(): string | undefined {
		return this.ticketForm.description
	}

	@Mutation
	modifyInput(state, { sectionIndex, inputIndex, rIndex }) {
		console.log("_____-", sectionIndex, inputIndex, rIndex)
		this.ticketForm.sections[sectionIndex].inputs[inputIndex].requirements[rIndex].validate = (
			v: string
		) => this.isOnlyLetters(v)
	}

	get getForm(): FormType {
		this.ticketForm.sections.forEach((section, sectionIndex) => {
			section.inputs.forEach((input, inputIndex) => {
				input.requirements.forEach((r, rIndex) => {
					switch (r.type) {
						case "only-letters":
							store.commit("ticket/addValidationFunctionInput", {
								sectionIndex,
								inputIndex,
								rIndex,
								fn: ((v) => this.isOnlyLetters(v))
							})
							break
					}
				})
			})
		})
		return this.ticketForm
	}

	@Mutation
	addValidationFunctionInput(
		sectionIndex: number,
		inputIndex: number,
		requirementIndex: number,
		fn: Function
	) {
		if (!sectionIndex || !inputIndex || !requirementIndex || !fn) {
			return
		}

		this.ticketForm.sections[sectionIndex].inputs[inputIndex].requirements[
			requirementIndex
		].validate = fn()
	}

	private isOnlyLetters(str: string): boolean {
		const letters = /^[A-Za-z]+$/
		return str.match(letters) !== null
	}

	private findInputById(
		id: string
	): { sectionIndex: undefined | number; indexInput: undefined | number } {
		let sectionIndex: undefined | number = undefined
		let indexInput: undefined | number = undefined
		this.ticketForm.sections.forEach((s, _sectionIndex) => {
			s.inputs.forEach((input, _indexInput) => {
				if (input.id === id) {
					sectionIndex = _sectionIndex
					indexInput = _indexInput
				}
			})
		})
		return { sectionIndex, indexInput }
	}

	private setError

	@Mutation
	setName(name: string, id: string) {
		/*
		const { sectionIndex, indexInput } = this.findInputById(id)
		if (!sectionIndex || !indexInput) {
			return
		}
		const input = this.ticketForm.sections[sectionIndex].inputs[indexInput]
		if (!this.isStringCorrect(input.value)) {
			const inputWithError: TextInputType = {
				status: "error",
				helperText: "Sólo puede contener letras",
				...input.properties
			}
			this.ticketForm.sections[sectionIndex].inputs[indexInput].properties = inputWithError
		}
	*/
	}
}
export const TicketModule = getModule(Ticket)
