/**
 * TODO
 */
import { Requirement } from "./requirements"
import { InputStatus } from "./inputState"
import { Indexes } from "./indexes"

export interface TextAreaType {
	helperText?: string
	placeholder?: string
	value?: string
	isDisabled?: boolean
	hideText?: boolean
	status?: InputStatus
	noBorder?: boolean
	noShadows?: boolean
	leaveSpaceRight?: boolean
}

export interface FS_TextAreaInput {
	tag: "text-area"
	question?: string
	properties: TextAreaType
	id: string
	value: string
	requirements: Requirement[]
	indexes?: Indexes
}
