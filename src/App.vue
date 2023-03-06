<script lang="ts" src="./app.ts"/>

<template>
	<div class="board">
		<div class ="columns">
			<input-form
				@addTask="addTasks"
			/>
			<column
				v-for="column in [created, inProgress, completed]"
				:column="column"
				:allColumns="[created, inProgress, completed]"
			/>
		</div>
	</div>
</template>

<style lang="scss">
* {
	font-family: "Dubai Light", sans-serif;
}

.board {
	position: absolute;
	height: 100%;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: lightblue;
	overflow: scroll;
	scrollbar-width: none;
}

.columns {
	display: flex;
	justify-content: center;
	gap: 20px;
	min-height: 200px;
	margin-top: 30px;
	margin-bottom: 30px;
}
</style>

