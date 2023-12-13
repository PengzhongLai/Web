import java.util.ArrayList;
import java.util.Scanner;

public class Dept  extends  Demo2{


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

/*        dept.setName("小明");
        dept.findbin();*/
        ArrayList<Demo2> list = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Dept dept = new Dept();
            System.out.println("请输入你想要输入的名字");
            String name = sc.next();
            System.out.println("请输入你想要输入的名字");
            String sex = sc.next();
            System.out.println("请输入你想要输入的名字");
            int age = sc.nextInt();
            dept.setName(name);
            dept.setAge(age);
            dept.setSex(sex);
            dept.findbin();
            list.add(dept);
        }
        for (Demo2 demo2 : list) {
            System.out.println(demo2);
        }
    }
}
