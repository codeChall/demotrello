<script lang="ts" src="./task.ts"/>

<template>
		<div
			class="task"
			:draggable="task.status !== 'Завершена'"
			@dragstart="startDrag($event, index, source)"
		>
			<div class="header">
				<div class="header__status">
					{{ task.status }}
				</div>
				<button
					class="header__btn"
					@click="removeTask(tasks, index)"
				>x</button>
			</div>
			<span class="task__info-item"> Название: {{ task.title }} </span>
			<span class="task__info-item"> Автор: {{ task.author }} </span>
			<span class="task__info-item"> Дата создания: {{ task.date }} </span>
			<span
				class="task__info-item"
				v-if="task.startDate"
			>
				Начало работы: {{ task.startDate }}
			</span>
			<span
				class="task__info-item"
				v-if="task.totalTime"
			>
				Затрачено времени: {{ task.totalTime }} ч
			</span>
			<span class="task__info-item"> Описание: {{ task.description }} </span>
		</div>
</template>

<style lang="scss">
.task {
	background: lightblue;
	border-radius: 3px;
	font-size: 16px;
	margin-bottom: 15px;

	&__info-item {
		display: block;
		padding: 5px;
	}
}

.header {
	display: flex;
	justify-content: space-between;

	&__status {
		border-radius: 3px;
		font-weight: bold;
		background: cadetblue;
		padding: 5px 5px;
	}

	&__btn {
		border: none;
		cursor: pointer;
		background: lightblue;
		height: 30px;
		width: 50px;
		font-size: 20px;
	}
}

</style>
