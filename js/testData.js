const randomizeTestData = (function () {
  const ExampleItem = function (type, description, sum) {
    this.type = type;
    this.description = description;
    this.sum = sum;
  };

  function putRandomValues() {
    const testData = [
      new ExampleItem(
        'inc',
        'Зарплата',
        (Math.random() * 32000 + 20000).toFixed(2),
      ),
      new ExampleItem(
        'inc',
        'Фриланс',
        (Math.random() * 5000 + 3000).toFixed(2),
      ),
      new ExampleItem(
        'inc',
        'Партнерка',
        (Math.random() * 7000 + 5000).toFixed(2),
      ),
      new ExampleItem(
        'inc',
        'Продажи digital',
        (Math.random() * 1000 + 500).toFixed(2),
      ),
      new ExampleItem('exp', 'Рента', 20000),
      new ExampleItem(
        'exp',
        'Бензин',
        (Math.random() * 3000 + 1000).toFixed(2),
      ),
      new ExampleItem(
        'exp',
        'Продукты',
        (Math.random() * 4000 + 2000).toFixed(2),
      ),
      new ExampleItem(
        'exp',
        'Развлечения',
        (Math.random() * 2000 + 1000).toFixed(2),
      ),
    ];

    const randomNum = Math.floor(Math.random() * testData.length);
    const randomItem = testData[randomNum];

    document.querySelector('#input__type').value = randomItem.type;
    document.querySelector('#input__description').value =
      randomItem.description;
    document.querySelector('#input__value').value = randomItem.sum;
  }

  return {
    putRandomValues,
  };
})();
