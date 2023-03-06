import {ref} from "vue";

export default {
	emits: ['addTask'],
	setup(props,{emit}) {
		/** Input заголовка задачи */
		const inputTitle       = ref<string>('');

		/** Input автора задачи */
		const inputAuthor      = ref<string>('');

		/** Input описания задачи */
		const inputDescription = ref<string>('');

		/**
		 * Создание задачи
		 */
		const addTask = () => {
			if (inputTitle.value.trim() === '' || inputAuthor.value.trim() === '' || inputDescription.value.trim() === '') {
				return
			}

			emit('addTask', {
				title:        inputTitle.value,
				author:       inputAuthor.value,
				date:         (new Date()).toLocaleString(),
				description:  inputDescription.value,
				status:       'Создана',
				startDate:    null,
				startCounter: null,
				totalTime:    null,
			})

			inputTitle.value       = '';
			inputAuthor.value      = '';
			inputDescription.value = '';
		};

		return {
			addTask,
			inputTitle,
			inputAuthor,
			inputDescription
		}
	}
}
