# import logging
# from django.db import connections

# class CloseDbConnectionMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         response = self.get_response(request)
#         try:
#             for conn in connections.all():
#                 if conn.connection is not None:
#                     conn.close()
#         except Exception as e:
#             logging.error(f"Error closing database connections: {e}")
#         return response
