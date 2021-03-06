<template>
	<div class="sponsorships-container">
		<div
			class="sponsorships-wrapper"
			v-for="sponsorCategory in sponsors"
			:key="sponsorCategory.category"
			:class="`sponsorships-wrapper-${sponsorCategory.category}`"
		>
			<Badge :type="sponsorCategory.category"></Badge>
			<div class="logos">
				<div v-for="sponsor in sponsorCategory.sponsors" :key="sponsor.name">
					<img :src="sponsor.logo" :alt="`Logo ${sponsor.name}`" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { SponsorsResource } from "../../types/api"
import axios from "axios"
import * as Components from "../"

@Component({
	components: {
		Badge: Components.Badge
	}
})
export default class Sponsors extends Vue {
	sponsors: SponsorsResource = []
	created() {
		this.getSponsors()
	}

	getSponsors() {
		console.log("SPONSORS", `${process.env.api}/editions/sponsors/2019/`)
		const config = {
			headers: { "Content-Type": "application/json" }
		}
		axios.get(`${process.env.api}/editions/sponsors/2019/`).then(d => {
			const data: any = d.data
			const allSponsors = data.filter(sponsor => sponsor.sponsor_type !== "None")
			this.sponsors.push({
				category: "bronze",
				sponsors: allSponsors.filter(s => s.sponsor_type === "BRONCE").map(s => s.company)
			})
			this.sponsors.push({
				category: "gold",
				sponsors: allSponsors.filter(s => s.sponsor_type === "ORO").map(s => s.company)
			})
			this.sponsors.push({
				category: "silver",
				sponsors: allSponsors.filter(s => s.sponsor_type === "PLATA").map(s => s.company)
			})
			this.sponsors.push({
				category: "platinum",
				sponsors: allSponsors.filter(s => s.sponsor_type === "PLATINO").map(s => s.company)
			})
		})
	}
}
</script>

<style scoped>
.sponsorships-container {
	max-width: 900px;
	margin: 0 auto;
	padding-bottom: calc(var(--space-l) * 2);
}
.sponsorships-container .sponsorships-wrapper {
	margin-bottom: calc(var(--space-l) * 2);
}

.sponsorships-container .sponsorships-wrapper .badge {
	margin: var(--space-s) auto;
}

.sponsorships-container .sponsorships-wrapper .logos {
	display: grid;
	grid-gap: var(--space-s);
	justify-content: center;
	align-items: center;
}

.sponsorships-container .sponsorships-wrapper-platinum .logos {
	grid-template-columns: 1fr;
	grid-auto-rows: 100px;
}

.sponsorships-container .sponsorships-wrapper-gold .logos {
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 80px;
}

.sponsorships-container .sponsorships-wrapper-silver .logos,
.sponsorships-container .sponsorships-wrapper-bronze .logos {
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: 55px;
}

.sponsorships-container .sponsorships-wrapper div {
	display: flex;
	justify-content: center;
}
.sponsorships-container .sponsorships-wrapper img {
	object-fit: contain;
}

.sponsorships-container .sponsorships-wrapper-platinum img {
	width: 100px;
	height: 100px;
}
.sponsorships-container .sponsorships-wrapper-gold img {
	width: 75px;
	height: 75px;
}
.sponsorships-container .sponsorships-wrapper-silver img,
.sponsorships-container .sponsorships-wrapper-bronze img {
	width: 50px;
	height: 50px;
}

@media screen and (min-width: 650px) {
	.sponsorships-container .sponsorships-wrapper .logos {
		grid-gap: var(--space-s) var(--space-l);
	}
	.sponsorships-container .sponsorships-wrapper {
		margin: calc(var(--space-l) * 2) 0;
	}

	.sponsorships-container .sponsorships-wrapper-platinum .logos {
		grid-template-columns: 1fr 1fr;
	}

	.sponsorships-container .sponsorships-wrapper-gold .logos {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.sponsorships-container .sponsorships-wrapper-silver .logos,
	.sponsorships-container .sponsorships-wrapper-bronze .logos {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
}

@media screen and (min-width: 950px) {
	.sponsorships-container .sponsorships-wrapper-platinum .logos {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.sponsorships-container .sponsorships-wrapper-gold .logos {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	.sponsorships-container .sponsorships-wrapper-silver .logos,
	.sponsorships-container .sponsorships-wrapper-bronze .logos {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
}
</style>
