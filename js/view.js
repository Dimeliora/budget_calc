// Модуль, отвечающий за отображение данных
const viewController = (function () {
  // Набор идентификаторов требуемых элементов HTML-разметки
  const DOMStrings = {
    form: '#budget-form',
    formTypeSelector: '#input__type',
    formDescription: '#input__description',
    formValue: '#input__value',
    incomesList: '#income__list',
    expensesList: '#expenses__list',
    totalBudgetValue: '#budget-value',
    totalIncomeValue: '#income-value',
    totalExpenseValue: '#expense-value',
    totalPercentsValue: '#percents-value',
    budgetList: '#budget-list',
    expPercents: '#exp-percent',
    curMonth: '#month',
    curYear: '#year',
  };

  // Передача набора id элементов другим модулям
  function getDOMStrings() {
    return DOMStrings;
  }

  // Передача другим модулям данных, введенных пользователем на странице приложения (доход/расход, описание, сумма)
  function getFormInputs() {
    const formTypeSelector = document.querySelector(
      DOMStrings.formTypeSelector,
    );
    const formDescription = document.querySelector(DOMStrings.formDescription);
    const formValue = document.querySelector(DOMStrings.formValue);
    return {
      type: formTypeSelector.value,
      description: formDescription.value,
      value: parseFloat(formValue.value),
    };
  }

  // Создание и отображение нового элемента списка на странице
  function drawNewListItem({ id, description, value }, itemType) {
    const normalizedValue = normalizeValue(value, itemType);
    let newListItemContainer, newListItemHTML;

    if (itemType === 'inc') {
      newListItemContainer = document.querySelector(DOMStrings.incomesList);
      newListItemHTML = getIncomeItemTemplate(id, description, normalizedValue);
    } else {
      newListItemContainer = document.querySelector(DOMStrings.expensesList);
      newListItemHTML = newListItemHTML = getExpenceItemTemplate(
        id,
        description,
        normalizedValue,
      );
    }
    newListItemContainer.insertAdjacentHTML('beforeend', newListItemHTML);
  }

  // Разметка для элемента списка доходов
  function getIncomeItemTemplate(id, description, normalizedValue) {
    return `
      <li id="inc-${id}" class="budget-list__item item item--income">       
        <div class="item__title">${description}</div>
        <div class="item__right">
          <div class="item__amount">${normalizedValue}</div>
          <button class="item__remove" id="remove-item">
              <img
                src="./img/circle-green.svg"
                alt="delete"
              />
          </button>
        </div>
      </li>
    `;
  }

  // Разметка для элемента списка расходов
  function getExpenceItemTemplate(id, description, normalizedValue) {
    return `
      <li id="exp-${id}" class="budget-list__item item item--expense">
        <div class="item__title">${description}</div>
          <div class="item__right">
            <div class="item__amount">
              ${normalizedValue}
              <div class="item__badge">
                <div class="badge badge--dark" id="exp-percent"></div>
              </div>
            </div>
            <button class="item__remove" id="remove-item">
              <img src="./img/circle-red.svg" alt="delete" />
            </button>
        </div>
      </li>
    `;
  }

  // Очистка полей ввода и фокусировка на поле "Описание"
  function clearFormInputFields() {
    document.querySelector(DOMStrings.formDescription).value = '';
    document.querySelector(DOMStrings.formValue).value = '';
    document.querySelector(DOMStrings.formDescription).focus();
  }

  // Удаление элемента списка из разметки HTML по его идентификатору id
  function removeItem(removedItemID) {
    document.querySelector(`#${removedItemID}`).remove();
  }

  // Отрисовка на странице общих расхода/дохода, бюджета и процентов
  function drawOverallBudget({ inc, exp, budget, percents }) {
    const overallIncome = normalizeValue(inc, 'inc');
    document.querySelector(
      DOMStrings.totalIncomeValue,
    ).innerText = overallIncome;

    const overallExpense = normalizeValue(exp, 'exp');
    document.querySelector(
      DOMStrings.totalExpenseValue,
    ).innerText = overallExpense;

    const overallBudget = normalizeValue(budget);
    document.querySelector(
      DOMStrings.totalBudgetValue,
    ).innerText = overallBudget;

    if (percents > 0) {
      document.querySelector(
        DOMStrings.totalPercentsValue,
      ).innerText = `${percents}%`;
    } else {
      document.querySelector(DOMStrings.totalPercentsValue).innerText = '-';
    }
  }

  // Приведение чисел к требуемому формату
  function normalizeValue(value, type = null) {
    let sign;
    const normalizer = new Intl.NumberFormat('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (type && value != 0) {
      // Знак для доходов (+) и расходов (-)
      sign = type === 'inc' ? '+' : '-';
    } else {
      // Знак для общего бюджета
      sign = value > 0 ? '+' : value < 0 ? '-' : '';
    }
    return `${sign} ${normalizer.format(Math.abs(value))}`;
  }

  // Отрисовка процентов по каждому элементу списка расходов
  function drawEpxensesPercents(expPercents) {
    const expensesListElement = document.querySelector(DOMStrings.expensesList);
    expPercents.forEach((item) => {
      currentListElement = expensesListElement.querySelector(`#${item.id}`);
      if (item.percents < 0) {
        currentListElement.classList.add('hide-percents');
      } else {
        currentListElement.classList.remove('hide-percents');
        currentListElement.querySelector(
          DOMStrings.expPercents,
        ).innerText = `${item.percents}%`;
      }
    });
  }

  // Отображение текущих месяца и года
  function displayDate() {
    const date = new Date();
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    document.querySelector(DOMStrings.curYear).innerText = date.getFullYear();
    document.querySelector(DOMStrings.curMonth).innerText =
      months[date.getMonth()];
  }

  return {
    getDOMStrings,
    getFormInputs,
    drawNewListItem,
    removeItem,
    clearFormInputFields,
    drawOverallBudget,
    drawEpxensesPercents,
    displayDate,
  };
})();
