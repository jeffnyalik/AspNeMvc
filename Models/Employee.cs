using System.ComponentModel.DataAnnotations;

namespace AllCrud.Models
{
    public class Employee : Base
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Office { get; set; }
        public string Position { get; set; }
        public int Age { get; set; }
        public int Salary { get; set; }
    }
}
