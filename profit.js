let expenseObj = {
  balance: document.getElementById('balance'),
  income: document.getElementById('income_value'),
  expense: document.getElementById('expense_value'),
  inputText: document.getElementById('text'),
  inputAmount: document.getElementById('amount'),
  history: document.getElementById('historydiv'),
  
  updateBalance: function (type, amount) {
    let [_, total] = this[type].innerHTML.split('$');
    total = (parseFloat(amount) + parseFloat(total)).toFixed(2);
    this[type].innerHTML = '$' + total;
  },
  
  addNew: function () {
    if (!this.inputText.value.trim()) {
      alert('Text cannot be null, please update');
      this.inputText.value = '';
      this.inputAmount.value = '';
      return;
    }
    
    if (!this.inputAmount.value) {
      alert('Amount cannot be null, please update');
      this.inputAmount.value = '';
      this.inputText.value = '';
      return;
    }
    
    let value = parseFloat(this.inputAmount.value);
    
    if (value > 100000000 || value < -100000000) {
      alert('the amount number cannot exceed 100000000, please reenter');
      this.inputAmount.value = '';
      this.inputText.value = '';
      return;
    }
    
    this.updateBalance('balance', value);
    if (value > 0) this.updateBalance('income',value);
    else this.updateBalance('expense',value);
    
    //add new div elements;
    let newDiv = document.createElement('div');
    if (value > 0) newDiv.className = 'history_record_income';
    else newDiv.className = 'history_record_expense';
    
    let newButton = document.createElement('button');
    newButton.className = 'delete_button';
    newButton.innerHTML = 'x';
    newButton.onclick = () => expenseObj.removeItem(event.srcElement.parentElement);
    newDiv.appendChild(newButton);
    
    let newChildDiv1 = document.createElement('div');
    newChildDiv1.innerHTML = this.inputText.value.trim();
    newDiv.appendChild(newChildDiv1);
    
    let newChildDiv2 = document.createElement('div');
    newChildDiv2.innerHTML = value.toFixed(2);
    newDiv.appendChild(newChildDiv2);
    
    this.history.appendChild(newDiv);
    
    //remove input area;
    this.inputAmount.value = '';
    this.inputText.value = '';
    
  },
  
  removeItem: function (element) {
    let child = element.children;
    value = 0 - parseFloat(child[2].innerHTML);
    this.updateBalance('balance', value);
    if (value <= 0) this.updateBalance('income',value);
    else this.updateBalance('expense',value);
    element.remove();
  },
};


