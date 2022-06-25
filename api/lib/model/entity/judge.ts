export interface JudgeTable {
  id?: number;
  prediction_id: string;
  user_id: string;
  verdict?: boolean;
  created_at?: string;
}
