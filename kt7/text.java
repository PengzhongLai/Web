public class text {
    public  static  void main(String[] args){
        long strat=System.currentTimeMillis();
        long endTime=strat+6000;
        long indenx=0;

        while (true){
            double x=Math.sqrt(indenx);
            long now=System.currentTimeMillis();
            if (now>endTime){
                break;
            }
            indenx++;
        }
        System.out.println(indenx); //测试cpu，数值越高越好
    }
}
