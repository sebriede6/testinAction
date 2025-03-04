function validateScore(score, options = {}) {
    const passingScore = options.passingScore ?? 60;
    const strictMode = options.strictMode ?? false;
    const bonusCategories = options.bonusCategories || [];
  
    const result = {
      valid: true,
      score: score,
      passed: false,
      grade: '',
      errors: []
    };
  
    if (score === undefined || score === null) {
      result.valid = false;
      result.errors.push('Score ist erforderlich');
      return result;
    }
  
    if (typeof score !== 'number') {
      result.valid = false;
      result.errors.push('Score muss eine Zahl sein');
      return result;
    }
  
    if (score < 0 || score > 100) {
      result.valid = false;
      result.errors.push('Score muss zwischen 0 und 100 liegen');
      return result;
    }
  
    if (strictMode) {
      if (Number.isNaN(score) || !Number.isFinite(score)) {
        result.valid = false;
        result.errors.push('Score muss eine gültige Zahl sein');
        return result;
      }
      if (!Number.isInteger(score)) {
        result.valid = false;
        result.errors.push('Score muss eine ganze Zahl sein');
        return result;
      }
    }
  
    let finalScore = score;
    if (bonusCategories.length > 0) {
      const bonusPoints = Math.min(bonusCategories.length * 2, 10);
      finalScore = Math.min(finalScore + bonusPoints, 100);
      result.score = finalScore;
    }
  
    result.passed = finalScore >= passingScore;
  
    if (finalScore >= 90) result.grade = 'A';
    else if (finalScore >= 80) result.grade = 'B';
    else if (finalScore >= 70) result.grade = 'C';
    else if (finalScore >= 60) result.grade = 'D';
    else result.grade = 'F';
  
    return result;
  }
  
  export { validateScore };
  