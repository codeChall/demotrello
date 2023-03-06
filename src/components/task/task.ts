
export default {
	emits: ['deleteTask', 'dragStart'],
	props: {
		/** Массив задач в колонке */
		tasks: {type: Array, default: []},
		/** Индекс задачи */
		index: {type: Number, default: 0},
		/** Задача */
		task: {type: Object, default: {}},
		/** Название колонки, из которой происходит захват карточки */
		source: {type: String, default: ''}
	},

	setup(props,{emit}) {
		/**
		 * Удаление задачи
		 */
		const removeTask = (tasks, index) => {
			emit('deleteTask', tasks, index);
		};

		/**
		 * Обработка события захвата карточки
		 */
		const startDrag = (index, evt, source) => {
			emit('dragStart', index, evt, source);
		};

		return {
			removeTask,
			startDrag
		}
	}
}
