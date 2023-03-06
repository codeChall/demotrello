<script lang="ts" src="./column.ts"/>

<template>
	<div class="column"
		 @drop="drop($event)"
		 @dragover.prevent
		 @dragenter.prevent
	>
		<h2 class="column__title">
			{{ column.title }}
		</h2>
		<task
			v-for="(task, index)  in column.tasks"
			:task="task"
			:index="index"
			:tasks="column.tasks"
			:source="column.title"
			@deleteTask="removeTask"
			@dragStart="startDrag"
		/>
	</div>
</template>

<style lang="scss">
.column {
	background: aliceblue;
	border-radius: 3px;
	min-height: 250px;
	width: 250px;
	padding: 12px;

	&__title {
		font-size: 25px;
	}
}
</style>
