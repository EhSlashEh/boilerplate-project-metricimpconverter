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
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return undefined;
    
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let unit = unitMatch[0].toLowerCase();

    if (unit === 'l') unit = 'L'; // Handle the special case for liters
    
    return validUnits.includes(unit) ? unit : undefined;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    
    return unitMap[initUnit];
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

module.exports = ConvertHandler
