using Entity.Enums;
using Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IOrderRepository:IAsyncRepository<Order>
    {
        Task<Order> Update(Order order);
        Task<Order> UpdateStatus(int id, OrderStatus status);
        Task<int> GetLastId();
    }
}
