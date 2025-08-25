export interface Purchase {
  id?: number;
  userId?: number;
  courseId?: number;
  title: string;
  price?: number;
  purchaseTime?: Date;
}
