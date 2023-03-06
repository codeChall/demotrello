<script lang=ts src="./input-form.ts"/>

<template>
	<div class="input-form">
		<div class="input-form__title">
			<input
				v-model="inputTitle"
				type="text"
				placeholder="Название задачи"
			>
		</div>
		<div class="input-form__author">
			<input
				v-model="inputAuthor"
				type="text"
				placeholder="Автор"
			>
		</div>
		<div class="input-form__description">
			<input
				v-model="inputDescription"
				type="text"
				placeholder="Описание"
			>
		</div>
		<button
			class="input-form__btn"
			@click="addTask"
		>
			Добавить
		</button>
	</div>
</template>

<style lang="scss">

.input-form {
	padding: 20px 20px;
	background: aliceblue;
	border-radius: 3px;
	height: 250px;

	&__title, &__author, &__description {
		padding: 10px 10px;
		margin-bottom: 10px;
	}

	&__btn{
		border: none;
		cursor: pointer;
		background: lightblue;
		border-radius: 3px;
		padding: 7px 7px;
		margin-left: 60px;
		font-size: 14px;
	}
}

input[type="text"] {
	border-radius: 3px;
	border: none;
	font-size: 16px;
}


</style>
