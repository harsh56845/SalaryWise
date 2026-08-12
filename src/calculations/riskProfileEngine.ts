import { RiskProfileAnswers, RiskCategory } from '../types';

export function calculateRiskProfile(answers: RiskProfileAnswers): RiskCategory {
  let score = 0;

  // 1. Experience
  if (answers.experience === 'experienced') score += 3;
  else if (answers.experience === 'intermediate') score += 2;
  else score += 1; // beginner

  // 2. Investment Horizon
  if (answers.horizon === 'long') score += 3;
  else if (answers.horizon === 'medium') score += 2;
  else score += 1; // short

  // 3. Loss Reaction
  if (answers.lossReaction === 'buy_more') score += 3;
  else if (answers.lossReaction === 'hold') score += 2;
  else score += 1; // sell

  // 4. Job Stability
  if (answers.stability === 'stable') score += 3;
  else if (answers.stability === 'moderate') score += 2;
  else score += 1; // unstable

  // 5. Dependents adjustment (more dependents = more conservative)
  if (answers.dependentsCount >= 3) score -= 1;
  else if (answers.dependentsCount === 0) score += 1;

  if (score >= 10) return 'Aggressive';
  if (score >= 6) return 'Moderate';
  return 'Conservative';
}
