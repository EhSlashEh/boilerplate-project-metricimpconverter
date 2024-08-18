function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    // Extract the numerical part of the input, default to 1 if not provided
    result = input.match(/[.\d\/]+/g) || ['1'];
    result = result[0];

    // Handle fraction format like "1/2"
    if (result.includes('/')) {
      const nums = result.split('/');
      if (nums.length > 2) {
        return undefined; // Invalid fraction
      }
      result = parseFloat(nums[0]) / parseFloat(nums[1]);
    } else {
      result = parseFloat(result);
    }

    if (isNaN(result)) {
      return undefined;
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result;

    // Extract the unit part of the input
    result = input.match(/[a-zA-Z]+/g);
    if (result) {
      result = result[0].toLowerCase();
      const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      if (validUnits.includes(result)) {
        return result === 'l' ? 'L' : result; // Handle case sensitivity for liters
      }
    }
    return undefined;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitsMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitsMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOutMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;    
    
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };  
}

module.exports = ConvertHandler;
