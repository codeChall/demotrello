import {TaskModel} from "@/models/task-model";

/**
 * Интерфейс колонки
 */
export interface ColumnModel {
	/** Название колонки */
	title: string,

	/** Флаг возможности перемещения карточки в колонку */
	droppable: boolean,

	/** Массив задач в колонке */
	tasks: TaskModel[]
}
