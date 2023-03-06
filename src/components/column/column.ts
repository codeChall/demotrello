import Task from '@/components/task/task.vue';

export default {
	components: {
		Task
	},
	props: {
		/** Массив колонок */
		allColumns: {type: Array, default: []},
		/** Колонка */
		column: {type: Object, default: {}},
	},

	setup(props) {
		/**
		 * Удаление задачи
		 */
		const removeTask = (tasks, index) => {
			tasks.splice(index, 1);
		};

		/**
		 * Обработка события захвата карточки
		 */
		const startDrag = (evt, index, source) => {
			evt.dataTransfer.dropEffect = 'move';
			evt.dataTransfer.effectAllowed = 'move';
			evt.dataTransfer.setData('index', index);
			evt.dataTransfer.setData('source', source);
		};

		/**
		 * Обработка события дропа карточки
		 * в работу
		 */
		const drop = (evt) => {
			const index = evt.dataTransfer.getData('index');
			const sourceColumn = evt.dataTransfer.getData('source');
			const destinationColumn = props.column.title;

			if (props.column.droppable && destinationColumn !== sourceColumn) {
				if (props.column.title === 'В работе') {
					//Обновить свойства задачи
					props.allColumns[0].tasks[index].status = 'В работе';
					props.allColumns[0].tasks[index].startCounter = new Date().getTime();
					props.allColumns[0].tasks[index].startDate = new Date().toLocaleString();
					props.allColumns[0].tasks[index].totalTime = ((new Date().getTime() - props.allColumns[0].tasks[index].startCounter) / 1000 / 60 / 60).toFixed(4)

					//Переместить задачу из одной колонки в другую
					props.allColumns[1].tasks.push(props.allColumns[0].tasks[index]);
					props.allColumns[0].tasks.splice(index, 1);

				} else if (props.column.title === 'Завершена' && sourceColumn !== 'Создана') {
					props.allColumns[1].tasks[index].status = 'Завершена';

					//Переместить задачу из одной колонки в другую
					props.allColumns[2].tasks.push(props.allColumns[1].tasks[index]);
					props.allColumns[1].tasks.splice(index, 1);
				}
			}
		};

		return {
			drop,
			removeTask,
			startDrag
		}
	}
}

