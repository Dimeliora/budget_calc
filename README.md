# Калькулятор бюджета
Простое приложение, реализованное в рамках обучения разработке на JavaScript.

### Краткое описание
Приложение реализовано на одной странице index.html и представляет собой простой калькулятор для подсчета бюджета.
В шапке страницы осуществляется вывод текущего месяца, года и суммарной информации: общий бюджет, суммарное число доходов, расходов и процентное соотношение расходов к доходам.
Работа с приложением осуществляется посредством формы, расположенной ниже шапки. Форма позволяет выбрать тип операции (доход / расход), ввести описание и сумму и добавить операцию в список.
Остальная часть приложения представлена блоком с двумя списками - расходы и доходы соответственно.
Каждый элемент списка отображает описание и сумму. Кроме того, элементы списка расходов отображают процентное соотношение между суммой данного расхода и общим доходом.
Проект реализован на чистом JS. Цель проекта - знакомство с паттерном MVC, отработка навыков работы с DOM.
Для демонстрации работы в проекте реализован источник mock-данных с автоподстановкой в поля формы после ввода, для этого необходимо раскомментировать вызовы randomizeTestData.putRandomValues() в скриптах main.js и controller.js).

### Работа с приложением
После инициализации приложение ожидает ввод пользователем соответствующих данных в форму.
Выбор операции производится в выпадающем списке ("-" - расход, "+" - доход), описание операции и сумма вводятся в соответствующих полях (поле "Сумма" - числовое).
Добавление операции в список осуществляется кнопкой "Добавить". При этом производится простая валидация введенных данных (поле с описанием не должно быть пустым, а сумма должна быть положительным числом). После успешного ввода поля "Описание" и "Сумма" очищаются, на поле "Описание" устанавливается фокус.
Добавленные данные помещаются в соответствующий список. Каждый элемент списка имеет возможность удаления (кнопка удаления отображается при наведении на соответствующий элемент списка).
При добавлении/удалении элемента производится автоматический подсчет общих сумм доходов, расходов, бюджета и процентных соотношений расход/доход и обновление соответствующих элементов DOM.
Отображение процентных соотношений в суммарной информации и в каждом элементе списка расходов осуществляется только при положительном значении процентов, т.е. при наличии доходов.
