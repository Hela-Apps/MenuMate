using Entity.Models;
using Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IOrderDetailRepository:IAsyncRepository<OrderDetail>
    {
        Task<IEnumerable<OrderDetailVM>> GetAllByOrderId(int orderId);
    }
}
