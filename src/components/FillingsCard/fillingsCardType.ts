

export type TFillingsCardIngredientProps<T> = {
  el: T;
  id: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};
export type TFillingsCardIngredientIndex = {
  id: string;
  index: number;
};