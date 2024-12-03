using Entity.Context;
using Entity.Models;
using Entity.ViewModels;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Implementation
{
    public class OrderDetailRepository : EfRepository<OrderDetail>, IOrderDetailRepository
    {
        protected MenuDbContext _context;
        public OrderDetailRepository(MenuDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrderDetailVM>> GetAllByOrderId(int orderId)
        {
            return await (from od in _context.Set<OrderDetail>()
                          join I in _context.Set<Item>() on od.ItemId equals I.Id
                          where od.OrderId == orderId
                          select new OrderDetailVM
                          {
                              Id = od.Id,
                              OrderId = od.OrderId,
                              ItemId = od.ItemId,
                              Qty = od.Qty,
                              Status = od.Status,
                              ItemName = I.Name
                          }).ToListAsync();

        }
    }

}
