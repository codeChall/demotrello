<script setup>

import {ref, watch, onMounted} from "vue";

let inputTitle       = ref('');
let inputAuthor      = ref('');
let inputDescription = ref('');

let createdTasks     = ref([{}]);

/**
 * Создание задачи
 */
const addTask = () => {
	if (inputTitle.value.trim() === '' || inputAuthor.value.trim() === '' || inputDescription.value.trim() === '') {
		return
	}

	createdTasks.value.push({
		title:        inputTitle.value,
		author:       inputAuthor.value,
		date:         (new Date()).toLocaleString(),
		description:  inputDescription.value,
		status:       'Создана',
		startDate:    null,
		startCounter: null,
		totalTime:    null
	})

	inputTitle.value       = '';
	inputAuthor.value      = '';
	inputDescription.value = '';
};

/**
 * Удаление задачи
 */
const removeTask = (index) => {
	createdTasks.value.splice(index, 1)
};

/**
 * Отслеживание списка задач
 */
watch(createdTasks, (newLists) => {
	localStorage.setItem('createdTasks', JSON.stringify(newLists))
}, { deep: true })

onMounted(() => {
	createdTasks.value = JSON.parse(localStorage.getItem('createdTasks') || []);
	setInterval(() => {
		createdTasks.value.forEach(task => {
			if (task.status === 'В работе') {
				task.totalTime = ((new Date().getTime() - task.startCounter) / 1000 / 60 / 60).toFixed(4)
			}
		})
	},1000)
 })

/**
 * Обработка события захвата карточки
 */
const startDrag = (evt, index) => {
	evt.dataTransfer.dropEffect = 'move';
	evt.dataTransfer.effectAllowed = 'move';
	evt.dataTransfer.setData('index', index);
};

/**
 * Обработка события дропа карточки
 * в работу
 */
const dropToProcess = (evt) => {
	const index = evt.dataTransfer.getData('index');
	if (createdTasks.value[index].status === 'Создана') {
		createdTasks.value[index].status       = 'В работе'
		createdTasks.value[index].startCounter = new Date().getTime()
		createdTasks.value[index].startDate    = new Date().toLocaleString()
		createdTasks.value[index].totalTime    = ((new Date().getTime() - createdTasks.value[index].startCounter) / 1000 / 60 / 60).toFixed(4)
	}
};

/**
 * Обработка события дропа карточки
 * в решено
 */
const dropToCompleted = (evt) => {
	const index = evt.dataTransfer.getData('index');
	createdTasks.value[index].status = 'Завершена';
};
</script>

<template>
	<div class="board">
		<div class="columns">
			<div id="input_form">
				<div class="task-title">
					<input v-model="inputTitle" type="text" placeholder="Название задачи" id="task-title">
				</div>
				<div class="task-author">
					<input v-model="inputAuthor" type="text" placeholder="Автор"  id="task-author">
				</div>
				<div class="task-description">
					<input v-model="inputDescription" type="text" placeholder="Описание"  id="task-description">
				</div>
				<button class="add-btn" @click="addTask">Добавить</button>
			</div>
			<div class="column" id="created">
				<h2 class="column_title">Создана</h2>
					<div class="task" draggable="true" @dragstart ="startDrag($event, index)" v-for="(newTask, index) in createdTasks" :key="newTask">
						<div v-if="newTask.status === 'Создана'">
							<div class="task-header">
								<div id="new" class="status"> {{ newTask.status }} </div>
								<button class="delete" @click="removeTask(index)"> x </button>
							</div>
							<span>Название: {{ newTask.title }} </span>
							<span>Автор: {{ newTask.author }} </span>
							<span>Дата создания: {{ newTask.date }} </span>
							<span>Описание: {{ newTask.description }} </span>
						</div>
					</div>
			</div>
			<div class="column" id="processed" @drop="dropToProcess($event)" @dragover.prevent @dragenter.prevent>
				<h2 class="column_title">В работе</h2>
				<div class="task" draggable="true" @dragstart ="startDrag($event, index)" v-for="(processedTask, index) in createdTasks" :key="processedTask">
					<div v-if="processedTask.status === 'В работе'">
						<div class="task-header">
							<div id="in_progress" class="status"> {{ processedTask.status }} </div>
							<button class="delete" @click="removeTask(index)"> x </button>
						</div>
						<span>Название: {{ processedTask.title }} </span>
						<span>Автор: {{ processedTask.author }} </span>
						<span>Дата создания: {{ processedTask.date}} </span>
						<span>Начало работы: {{ processedTask.startDate }} </span>
						<span>Затрачено времени: {{ processedTask.totalTime }} ч </span>
						<span>Описание: {{ processedTask.description }} </span>
					</div>
				</div>
			</div>
			<div class="column" id="completed" @drop="dropToCompleted($event)" @dragover.prevent @dragenter.prevent>
				<h2 class="column_title">Завершена</h2>
				<div class="task" v-for="(completedTask, index) in createdTasks" :key="completedTask">
					<div v-if="completedTask.status === 'Завершена'">
						<div class="task-header">
							<div id="final" class="status"> {{ completedTask.status }} </div>
							<button class="delete" @click="removeTask(index)"> x </button>
						</div>
						<span>Название: {{ completedTask.title }} </span>
						<span>Автор: {{ completedTask.author }} </span>
						<span>Дата создания: {{ completedTask.date }} </span>
						<span>Начало работы: {{ completedTask.startDate }} </span>
						<span>Затрачено времени: {{ completedTask.totalTime }} ч </span>
						<span>Описание: {{ completedTask.description }} </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
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

#input_form {
	padding: 20px 20px;
	background: aliceblue;
	border-radius: 3px;
	height: 250px;
}

#task-title, #task-author , #task-description {
	border-radius: 3px;
	border: none;
	font-size: 16px;
}

.task-title, .task-author, .task-description {
	padding: 10px 10px;
	margin-bottom: 10px;
}

.add-btn {
	border-radius: 3px;
	border: none;
	cursor: pointer;
	padding: 7px 7px;
	margin-left: 60px;
	background: lightblue;
	font-size: 14px;
}

.columns {
	display: flex;
	justify-content: center;
	gap: 20px;
	min-height: 200px;
	margin-top: 30px;
	margin-bottom: 30px;
}

.column_title {
	font-size: 25px;
}

.column {
	background: aliceblue;
	border-radius: 3px;
	min-height: 250px;
	width: 250px;
	padding: 12px;
}

.task {
	background: lightblue;
	border-radius: 3px;
	font-size: 16px;
	margin-bottom: 15px;
}

.status {
	border-radius: 3px;
	font-weight: bold;
	background: cadetblue;
	padding: 5px 5px;
}

span {
	display: block;
	padding: 5px;
}

.task-header {
	display: flex;
	justify-content: space-between;
}

.delete {
	height: 30px;
	width: 40px;
	background: lightblue;
	border: none;
	font-size: 20px;
	cursor: pointer;
}
</style>

