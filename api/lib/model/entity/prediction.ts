export interface PredictionTable {
  id: string;
  user_id: string;
  conditions: string;
  verdict?: boolean;
  created_at?: string;
}
