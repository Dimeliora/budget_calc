// Модуль, отвечающий за взаимодействие интерфейса и модели (хранилища)
const controller = (function () {
  function init() {
    viewController.displayDate();
    setupEventListeners();
  }

  // Обработка событий на странице приложения
  function setupEventListeners() {
    const DOM = viewController.getDOMStrings();
    document.querySelector(DOM.form).addEventListener('submit', addListItem);
    document
      .querySelector(DOM.budgetList)
      .addEventListener('click', removeListItem);
  }

  // Обработка отправки формы, проверка ввода данных, добавление новой записи, обновление общих данных
  function addListItem(e) {
    e.preventDefault();
    const inputValues = viewController.getFormInputs();
    if (checkInputValid(inputValues)) {
      const newListItem = modelController.addNewItem(inputValues);
      viewController.drawNewListItem(newListItem, inputValues.type);
      updateBudget();
      updateExpensesPercents();
      viewController.clearFormInputFields();
    }
    
    // Источник mock-данных с автоподстановкой в поля формы
    // randomizeTestData.putRandomValues();
  }

  // Обработка клика на кнопке удаления пункта
  function removeListItem(e) {
    if (e.target.closest('#remove-item')) {
      const ItemID = getItemIDToRemove(e);
      const removedItemID = modelController.removeItem(ItemID);
      viewController.removeItem(removedItemID);
      updateBudget();
      updateExpensesPercents();
    }
  }

  // Проверка валидности ввода - непустое поле "Описание", корректное число, большее нуля в поле "Сумма"
  function checkInputValid(input) {
    if (input.description !== '' && input.value > 0) {
      return true;
    } else {
      alert('Проверьте корректность заполнения полей "Описание" и "Сумма"');
      return false;
    }
  }

  // Получение ID удаляемого элемента списка, в общем виде и разделенном на два параметра: строка с типом и ID (индекс) в числовом представлении
  function getItemIDToRemove(e) {
    const fullItemID = e.target.closest('li.budget-list__item').id;
    const [itemType, itemIndex] = fullItemID.split('-');
    return {
      fullItemID,
      itemType,
      itemIndex,
    };
  }

  // Обновление общего бюджета после добавления нового пункта
  function updateBudget() {
    modelController.updateOverallBudget();
    viewController.drawOverallBudget(modelController.getOverallBudget());
  }

  // Обновление процентов по каждому элементу списка расходов
  function updateExpensesPercents() {
    modelController.calculateExpensePercents();
    viewController.drawEpxensesPercents(modelController.getExpensesPercents());
  }

  return {
    init,
  };
})();
