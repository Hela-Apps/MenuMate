using Entity.Enums;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IOrderService
    {
        Task<Order> Add(Order order);
        Task<Order> Get(int id);
        Task<IEnumerable<Order>> GetAll();
        Task<Order> Update(Order order);
        Task<Order> UpdateStatus(int id, OrderStatus status);
        Task<int> GetLastId();
    }
}
