// Модуль, отвечающий за хранение и работу с данными
const modelController = (function () {
  // Конструктор для создания экземпляров "Доход"
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Конструктор для создания экземпляров "Расход"
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percents = -1;
  };

  // Store приложения
  let data = {
    allItems: {
      // Элементы списков:
      inc: [], // доходы
      exp: [], // расходы
    },
    totals: {
      // Суммарная информация по
      inc: 0, // доходам и
      exp: 0, // расходам
    },
    budget: 0,
    percents: -1,
  };

  // Добавление в хранилище нового экземпляра
  function addNewItem({ type, description, value }) {
    let id = 0;
    // Вычисление ID (номера) для нового элемента. Если в хранилище пусто, начинаем с 0, если нет - исходим из ID последнего элемента
    if (data.allItems[type].length > 0) {
      id = data.allItems[type][data.allItems[type].length - 1].id + 1;
    }

    let newItem =
      type === 'inc'
        ? new Income(id, description, value)
        : new Expense(id, description, value);
    data.allItems[type].push(newItem);

    return newItem;
  }

  // Удаление элемента списка из хранилища по его идентификатору id
  function removeItem(itemID) {
    data.allItems[itemID.itemType] = data.allItems[itemID.itemType].filter(
      (item) => item.id !== +itemID.itemIndex,
    );
    return itemID.fullItemID;
  }

  // Обновление общих дохода/расхода, бюджета и процентов
  function updateOverallBudget() {
    data.totals.inc = data.allItems.inc.reduce(
      (total, item) => total + item.value,
      0,
    );
    data.totals.exp = data.allItems.exp.reduce(
      (total, item) => total + item.value,
      0,
    );
    data.budget = data.totals.inc - data.totals.exp;
    // Вычисление процентов, при условии, что доход больше 0 (если 0, то обозначаем результат как -1)
    data.percents =
      data.totals.inc > 0
        ? Math.round((data.totals.exp / data.totals.inc) * 100)
        : -1;
  }

  // Вычисление процентов каждого расхода относительно общего дохода
  function calculateExpensePercents() {
    data.allItems.exp.forEach(
      (item) =>
        (item.percents =
          data.totals.inc > 0
            ? Math.round((item.value / data.totals.inc) * 100)
            : -1),
    );
  }

  // Возвращение данных по общим доходу/расходу, бюджету и процентам
  function getOverallBudget() {
    return {
      inc: data.totals.inc,
      exp: data.totals.exp,
      budget: data.budget,
      percents: data.percents,
    };
  }

  // Возвращение данных по процентам каждого из расходов в виде массива объектов {id, percents}
  function getExpensesPercents() {
    return data.allItems.exp.map((item) => ({
      id: `exp-${item.id}`,
      percents: item.percents,
    }));
  }

  return {
    addNewItem,
    removeItem,
    updateOverallBudget,
    getOverallBudget,
    calculateExpensePercents,
    getExpensesPercents,
  };
})();
