var app = new Vue({
	el: '#app',
	vuetify: new Vuetify({
		icons: {
			iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
		}
	}),

	data() {


		return {
			showColumn: true,
			selected: [],
			searchByname: '',
			data: [],
			dialogData: { salary: 0, fraction: 0, base: 0, advance: 0 },
			dialog: false,
			editedItem: {
				name: '',
				companyName: '',
				positionName: '',
				hireDate: '',
				fireDate: null,
				stavka: {
					salary: 0,
					fraction: 0,
				},
				base: 0,
				advance: 0,
				byHours: false
			}

		}
	},
	computed: {
		headers() {
			return [
				{ text: 'Сотрудник', align: 'start', value: 'name' },
				{ text: 'Компания', value: 'companyName' },
				{ text: 'Должность', value: 'positionName' },
				{ text: 'Дата приёма', value: 'hireDate' },
				{
					text: 'Дата увольнения',

					value: 'fireDate',
					filter: value => {
						if (!this.showColumn && value) return false;
						else return true
					}
				},
				{ text: 'Ставка', value: 'stavka' },
				{ text: 'База', value: 'base' },
				{ text: 'Аванс', value: 'advance' },
				{ text: 'Почасовая', value: 'byhours' }
			]
		},

		buttontext() {
			if (this.selected.length > 1) {
				return 'Снять с должностей'
			}
			else {
				return 'Снять с должности'
			}
		}

	},
	methods: {
		itemRowBackground: function (item) {
			if (item.fireDate != null) {
				return 'redtablerow'
			}
		},
		filterByname: function (value, search, item) {
			if (item.name == value) {
				value = value.toLocaleLowerCase();
				search = search.toLocaleLowerCase();
				return value.includes(search)
			} else {
				return false
			}

		},
		addFireDate: function () {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			today = dd + '.' + mm + '.' + yyyy;
			this.selected.forEach(data => data.fireDate = today)


		},
		saveStavka: function (item) {

			item.stavka.salary = this.dialogData.salary;
			item.stavka.fraction = this.dialogData.fraction;

		},
		saveAdvance: function (item) {
			item.advance = this.dialogData.advance;
		},
		saveBase: function (item) {
			item.base = this.dialogData.base;
		},
		save: function () {
			this.data.push(this.editedItem);
			this.dialog = false;
			c = this.getCookie('csrftoken');
			fetch('http://127.0.0.1:8000/awoo/addemployee',
				{
					method: 'POST',
					mode: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFToken': c
					},
					body: JSON.stringify(this.editedItem)
				})
		},
		getCookie: function (name) {
			let cookieValue = null;
			if(document.cookie && document.cookie !== '') {
				const cookies = document.cookie.split(';');
				for (let i = 0; i < cookies.length; i++) {
					const cookie = cookies[i].trim();
					if (cookie.substring(0, name.length + 1) === (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}




	},
	created: function () {
		fetch("http://127.0.0.1:8000/awoo/employees")
			.then(response => response.json())
			.then(data => this.data = data)
	}


})
