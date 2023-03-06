/**
 * Интерфейс задачи
 */
export interface TaskModel {
	/** Название задачи */
	title: string,

	/** Автор задачи */
	author: string,

	/** Дата создания задачи */
	date: string,

	/** Описание задачи */
	description: string,

	/** Статус задачи */
	status: string,

	/** Дата начала работы над задачей */
	startDate: string,

	/** Время старта отчета всего затраченного времени  */
	startCounter: number,

	/** Количество всего затраченного времени  */
	totalTime: string
}
