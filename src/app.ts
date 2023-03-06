import {watch, onMounted, reactive} from "vue";
import {ColumnModel} from "@/models/column-model";
import InputForm from '@/components/input-form/input-form.vue';
import Task from '@/components/task/task.vue';
import Column from '@/components/column/column.vue'

export default {
	emits: ['addTask'],
	components: {
		InputForm,
		Column,
		Task
	},

	setup() {
		/** Столбец "Создана" */
		const created = reactive<ColumnModel>({
			title: 'Создана',
			droppable: false,
			tasks: []
		});

		/** Столбец "В работе" */
		const inProgress = reactive<ColumnModel>({
			title: 'В работе',
			droppable: true,
			tasks: []
		});

		/** Столбец "Завершена" */
		const completed = reactive<ColumnModel>({
			title: 'Завершена',
			droppable: true,
			tasks: []
		});

		/**
		 * Создание карточки
		 */
		const addTasks = (data) => {
			created.tasks.push(data);
		};

		/**
		 * Отслеживание списка созданных задач
		 */
		watch(created.tasks, (newTasks) => {
			localStorage.setItem('created', (JSON.stringify(newTasks)))
		}, {deep: true})

		/**
		 * Отслеживание списка задач в работе
		 */
		watch(inProgress.tasks, (newTasks) => {
			localStorage.setItem('inProgress', (JSON.stringify(newTasks)))
		}, {deep: true})

		/**
		 * Отслеживание списка задач в решено
		 */
		watch(completed.tasks, (newTasks) => {
			localStorage.setItem('completed', (JSON.stringify(newTasks)))
		}, {deep: true})


		onMounted(() => {
			Object.assign(created.tasks, JSON.parse(localStorage.getItem('created') || ''));
			Object.assign(inProgress.tasks, JSON.parse(localStorage.getItem('inProgress') || ''));
			Object.assign(completed.tasks, JSON.parse(localStorage.getItem('completed') || ''));

			//Обновить таймер затраченного времени
			setInterval(() => {
				if (inProgress.tasks.length > 0) {
					inProgress.tasks.forEach(task => {
						task.totalTime = (((new Date().getTime() - task.startCounter) / 1000 / 60 / 60).toFixed(4))
					})
				}
			},2000)
		})

		return {
			addTasks,
			created,
			inProgress,
			completed
		}
	}
}
